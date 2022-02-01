import React from "react";
import "../static/css/HomeCard.css";
import { useNavigate } from "react-router-dom";

export default function HomeCard(props) {
  const regex = /(<([^>]+)>)/gi;
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/blog/" + props.doc.data().slug);
  };
  return (
    <div className="card" onClick={clickHandler}>
      <img className="card-img" src="https://source.unsplash.com/random" />
      <div className="card-body">
        <h2>{props.doc.data().title}</h2>
        <p>{props.doc.data().body.replace(regex, "")}</p>
        <h5>By: {props.doc.data().author}</h5>
      </div>
    </div>
  );
}
