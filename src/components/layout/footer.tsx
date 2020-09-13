import React from "react";
//redux
import { useSelector } from "react-redux";
import { rootState } from "../../store/rootReducer";

const Footer = () => {
  const { isAuthenticated } = useSelector((state: rootState) => state.auth);
  return (
    <div>{isAuthenticated ? <div className="sectionPadding"></div> : null}</div>
  );
};

export default Footer;
