import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Editor } from "@tinymce/tinymce-react";
import "draft-js/dist/Draft.css";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import slugify from "react-slugify";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import uniqid from "uniqid";
import React from "react";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function Form(props) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };

  var navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  async function handleEditorChange(e) {
    setBody(e.target.getContent());
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  let from = query.get("from");

  const submitForm = async () => {
    const id = uniqid();
    if (value === "") {
      handleClick();
    } else if (body === "") {
      handleClick();
    } else {
      try {
        const docRef = await addDoc(collection(db, "blogs"), {
          title: value,
          slug: slugify(value),
          body: body,
          id: id,
          author: props.user.displayName,
          likes: 0,
          share: 0,
        });
        navigate("/dashboard/home");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom component="div">
        Create a new blog
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        Blog Title
      </Typography>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        sx={{
          width: 500,
        }}
      />
      <Typography
        sx={{ marginTop: 3 }}
        variant="h6"
        gutterBottom
        component="div"
      >
        Blog Body
      </Typography>
      <Editor
        apiKey="w9pgyzujrjqebplawwyi6us0b4ko3xy2bq12rvf5kracrox0"
        init={{
          height: 500,
          menubar: false,
          skin: "oxide-dark",
          content_css: "dark",
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
        }}
        onChange={handleEditorChange}
      />{" "}
      <Stack direction="row" sx={{ marginTop: 3 }} spacing={2}>
        <Button variant="contained" onClick={submitForm}>
          Create
        </Button>
        <Button variant="ghost" onClick={() => navigate(from)}>
          Cancel
        </Button>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Please fill all fields"
        action={action}
      />
    </Box>
  );
}
