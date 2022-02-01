import * as React from "react";
import ReactHtmlParser from "react-html-parser";

import PropTypes from "prop-types";
import { LinearProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import "../static/css/BlogHeader.css";
import { useParams, useNavigate } from "react-router-dom";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const BlogHeader = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [body, setBody] = React.useState("");
  const [value, loading, error] = useCollection(collection(db, "blogs"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const ref = collection(db, "blogs");
  const { slug } = useParams();
  const q = query(ref, where("slug", "==", slug));
  React.useEffect(async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setTitle(doc.data().title);
      setAuthor(doc.data().author);
      setBody(doc.data().body);
    }, []);
  });
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {value && (
          <span>
            <React.Fragment>
              <CssBaseline />
              <HideOnScroll>
                <AppBar>
                  <Toolbar>
                    <Typography
                      onClick={() => navigate("/")}
                      variant="h6"
                      component="div"
                    >
                      Keitod Blog
                    </Typography>
                  </Toolbar>
                </AppBar>
              </HideOnScroll>
              <Toolbar />
              <Container>
                <Box sx={{ my: 2 }}>
                  <h1 className="blog-title">{title}</h1>
                  <h3 className="blog-author">By: {author}</h3>
                  <div className="blog-body">{ReactHtmlParser(body)}</div>
                </Box>
              </Container>
            </React.Fragment>
          </span>
        )}
      </p>
    </div>
  );
};

export default BlogHeader;
