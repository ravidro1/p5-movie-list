import { Route, Routes } from "react-router-dom";

import Default from "./Pages/Default";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MovieDetail from "./Pages/MovieDetail";
import CreateNewMovieReview from "./Pages/CreateNewMovieReview";

import AutoNavigateRoutes from "./Navigation/AutoNavigateRoutes";
import ProtectedRoutes from "./Navigation/ProtectedRoutes";

import "./Config/axios.config";
import { useSelector } from "react-redux";
import "./style";
function App() {
  const state = useSelector((state) => state);
  // console.log(state);

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        overflow: "auto",
      }}
      className="bg-light"
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AutoNavigateRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/movieDetail/:movieName" element={<MovieDetail />} />{" "}
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/createNewMovieReview"
            element={<CreateNewMovieReview />}
          />{" "}
        </Route>
        <Route path="*" element={<Default />} />
      </Routes>
    </div>
  );
}

export default App;
