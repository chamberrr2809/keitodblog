import Typography from "@mui/material/Typography";
import React from "react";

export default function Greeting(props) {
  const [crn, setCrn] = React.useState("");
  const [msg, setMsg] = React.useState("");
  React.useEffect(() => {
    var arr = [
      "What idea do you have?",
      "How's your day?",
      "Welcome Back",
      "Does it rainy outside?",
      "What greatness will you write?",
    ];
    setMsg(arr[Math.floor(Math.random() * arr.length)]);

    var d = new Date();
    var time = d.getHours();

    if (time < 12 && time > 5) {
      setCrn("Morning");
    }
    if (time > 12) {
      setCrn("Afternoon");
    }
    if (time > 16 && time < 20) {
      setCrn("Evening");
    }
    if (time > 20 && time < 5) {
      setCrn("Night");
    }
  }, []);

  return (
    <Typography variant="h4" gutterBottom component="div">
      Good {crn}, {props.user.displayName}! {msg}
    </Typography>
  );
}
