import { Route, Routes } from "react-router-dom";

import Default from "./Pages/Default";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MovieDetail from "./Pages/MovieDetail";

import AutoNavigateRoutes from "./Components/AutoNavigateRoutes";

import "./Config/axios.config";
import "./style.css";

function App() {
  return (
    <div
      style={{ minWidth: "100vw", minHeight: "100vh", overflow: "auto" }}
      className="bg-light"
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route element={<AutoNavigateRoutes />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* </Route> */}
        <Route path="/movieDetail/:movieName" element={<MovieDetail />} />{" "}
        <Route path="*" element={<Default />} />
      </Routes>
    </div>
  );
}

export default App;
