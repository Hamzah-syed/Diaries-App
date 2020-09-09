import React, { FC } from "react";
import Diaries from "./diaries";
import Editor from "./editor";

const Home = () => {
  return (
    <div>
      <div className="left">
        <Diaries />
      </div>
      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
