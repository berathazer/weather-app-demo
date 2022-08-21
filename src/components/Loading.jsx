import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="h-screen w-full bg-zinc-800 flex items-center justify-center">
      <ReactLoading
        type={"spinningBubbles"}
        color={"white"}
        height={"200px"}
        width={"200px"}
        
      />
    </div>
  );
};

export default Loading;
