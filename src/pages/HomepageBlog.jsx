import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import HomeHeader from "../components/HomeHeader";
import Button from "@mui/material/Button";
import { Box, LinearProgress } from "@mui/material";

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

const HomepageBlog = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
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
        <HomeHeader user={user} />
      </div>
    );
  }
  return <Button onClick={login}>Log in</Button>;
};

export default HomepageBlog;
