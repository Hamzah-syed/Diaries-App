import React from "react";
//redux
import { useSelector } from "react-redux";
import { rootState } from "../../store/rootReducer";
//mui
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  footer: {
    padding: "10px",
  },
}));

const Footer = () => {
  const classes = useStyle();
  const { isAuthenticated } = useSelector((state: rootState) => state.auth);
  return (
    <div>{isAuthenticated ? <div className="sectionPadding"></div> : null}</div>
  );
};

export default Footer;
