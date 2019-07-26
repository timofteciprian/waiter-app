import React from "react";
import table from "../../../../static/Group.svg";
const styles = {
  //border: "1px dashed gray",
  //padding: "5px",
  height: "67px",
  width: "130px",
  cursor: "move"
};
const Box = ({ title, yellow }) => {
  //const backgroundColor = yellow ? "yellow" : "white";
  const backgroundImage = `url(${table})`;
  return <div style={{ ...styles, backgroundImage }}>{title}</div>;
};
export default Box;
