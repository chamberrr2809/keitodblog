import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import auth from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function BasicTable(props) {
  const [likes, setLikes] = React.useState("");
  const [share, setShare] = React.useState("");
  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  React.useEffect(async () => {
    const ref = collection(db, "blogs");
    const q = query(ref, where("author", "==", props.name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setLikes(doc.data().likes);
      setShare(doc.data().share);
      setId(doc.data().id);
      setTitle(doc.data().title);
    });
  }, []);
  var navigate = useNavigate();
  const [value, loading, error] = useCollection(collection(db, "blogs"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && (
          <span>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </span>
        )}
        {value && (
          <span>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell align="right">Slug</TableCell>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">Likes</TableCell>
                    <TableCell align="right">Shares</TableCell>
                  </TableRow>
                </TableHead>
                {value.docs.map((doc) => (
                  <TableBody>
                    <TableRow
                      key={doc.data().id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        onClick={() =>
                          navigate(`/dashboard/blogs/${doc.data().slug}/edit`)
                        }
                        scope="row"
                      >
                        {doc.data().title}
                      </TableCell>
                      <TableCell align="right">{doc.data().author}</TableCell>
                      <TableCell align="right">{doc.data().slug}</TableCell>
                      <TableCell align="right">{doc.data().id}</TableCell>
                      <TableCell align="right">{doc.data().likes}</TableCell>
                      <TableCell align="right">{doc.data().share}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </span>
        )}
      </p>
    </div>
  );
}
