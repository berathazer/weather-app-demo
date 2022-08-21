import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveApiKey } from "../../features/ApiKey";
import {Navigate, useNavigate} from "react-router-dom"
import {toast,Toaster} from "react-hot-toast"

const Login = () => {
  const dispatch = useDispatch();
  const [api, setApi] = useState(sessionStorage.getItem("userApiKey") || "");
  const navigate = useNavigate();
  const handleClick = ()=>{
    
    dispatch(saveApiKey(api))
    if(api.length === 0){
      toast.error("hata")
    }
    navigate("/map");
    toast.success("giriş başarılı",{position:"top-center"})
    
  }
  return (
    <div className="w-full h-screen bg-slate-800 text-white text-xl flex flex-col gap-6 mx-auto items-center justify-center">
      <p>Api key giriniz:</p>
      <input
        onChange={(e) => {
          setApi(e.target.value);
        }}
        value={api}
        type="text"
        className=" text-white outline-none bg-slate-700 px-2 py-1 w-[25%]"
      />
      <button
        onClick={handleClick}
        className="btn btn-primary bg-teal-500 py-2 px-10 rounded-lg mb-2 "
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default Login;
