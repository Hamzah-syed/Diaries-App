import React, { FC } from "react";
import Diaries from "./diaries";

const Home: FC = () => {
  return (
    <div>
      <div className="left">
        <Diaries />
      </div>
      {/* <div className="right">
        <Editor />
      </div> */}
    </div>
  );
};

export default Home;
