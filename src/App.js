import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Map from "./components/Map/Map";

import { Toaster } from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleCity from "./components/SingleCity/SingleCity";
import Loading from "./components/Loading";

import Error from "./components/Error"

function App() {
  const apiKey = useSelector(state => state.apiHandle.apiKey)
  const plate = useSelector(state =>state.apiHandle.cityPlate)
  const cityName = useSelector(state => state.apiHandle.cityName);

  const RequireAuth = ({ children }) => {
    return apiKey ? children : <Navigate to="/login" />;
  };
  return (
    <>
      <div className=" w-full h-screen " style={{fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif'"}}>
        <Toaster position="top-right"/>
        <Router>
          <Routes>
            <Route path="/" >
              <Route index element={<Login/>}/>
              <Route path="404" element={<Error/>}/>
              <Route path="loading" element={<Loading/>} />
              <Route path="login" element={<Login />} />

              <Route path="map" >
                <Route index element={<RequireAuth><Map/></RequireAuth>}/>
                <Route path=":city" element={<SingleCity/>}/>
              </Route>
              
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
