import * as React from "react";
import Button from "@mui/material/Button";
import "../App.css";
import LinearProgress from "@mui/material/LinearProgress";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Greeting from "../components/Greeting";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { useNavigate } from "react-router-dom";
import BasicCard from "../components/Chart";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import { EditOutlined } from "@mui/icons-material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashboardProfile() {
  let navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Authenticated");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const logout = () => {
    signOut(auth);
  };

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem button onClick={() => navigate("/dashboard/home")}>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => navigate("/dashboard/blogs")}>
                <ListItemIcon>
                  <FeedOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Blogs" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => navigate("/dashboard/profile")}>
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Avatar
                  alt={user.displayName}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                  src={user.photoURL}
                />
                <Typography variant="h5" component="div">
                  {user.displayName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </CardActions>
            </Card>
            <Fab
              variant="extended"
              sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
              }}
              color="primary"
              aria-label="add"
              onClick={() =>
                navigate("/dashboard/blogs/new?from=/dashboard/profile")
              }
            >
              <EditOutlined sx={{ mr: 1 }} />
              New
            </Fab>
          </Box>
        </Box>
      </div>
    );
  }
  return (
    <Button variant="contained" onClick={login}>
      Log in
    </Button>
  );
}
