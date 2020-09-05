import React from "react";
//mui
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  [theme.breakpoints.down("md")]: {
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    background: "white",
  },
}));
const demo = () => {
  const classes = useStyle();

  return <div></div>;
};

export default demo;
