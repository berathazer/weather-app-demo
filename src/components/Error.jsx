import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const error = useSelector((state) => state.apiHandle.error);
  const navigate = useNavigate();
  console.log(error.state);

  if (!error) {
    return <>{navigate("/login")}</>;
  }
  return (
    <div className="bg-teal-900 text-white w-full h-screen items-center justify-center text-2xl flex flex-col">
      <div className="mb-5 flex flex-col">
        <p className="bg-red-400 p-2 rounded-lg">{error}</p> 
        <div onClick={()=>navigate("/")} className="cursor-pointer bg-green-400 px-5 py-2 mx-auto mt-5 rounded-md font-bold text-xl">
          Anasayfa
        </div>
      </div>
    </div>
  );
};

export default Error;
