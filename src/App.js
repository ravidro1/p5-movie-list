import { Route, Routes } from "react-router-dom";

import Default from "./Pages/Default";
import Detail from "./Pages/Detail";
import FullList from "./Pages/FullList";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import "./Config/axios.config";
import AutoNavigateRoutes from "./Components/AutoNavigateRoutes";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  // const { token } = useSelector((state) => state.UserReducer);
  // console.log(token);
  // console.log(Store.getState()?.lastAction);

  const [list, setList] = useState([]);
  return (
    <div
      style={{ minWidth: "100vw", minHeight: "100vh", overflow: "hidden" }}
      className="bg-light"
    >
      {list != null && (
        <Routes>
          <Route
            path="/"
            element={<HomePage list={list} setList={setList} />}
          />
          {/* <Route element={<AutoNavigateRoutes />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* </Route> */}
          <Route
            path="/detail/:movieName"
            element={<Detail list={list} setList={setList} />}
          />{" "}
          <Route
            path="/fullList"
            element={<FullList list={list} setList={setList} />}
          />
          <Route path="*" element={<Default />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
