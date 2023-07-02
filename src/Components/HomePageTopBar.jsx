import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { logoutUser } from "../Redux/Actions/UserAction";

export default function HomePageTopBar() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <section className="w-100">
      {token ? (
        <div className="w-100 d-flex justify-content-between">
          <Button className="px-4 py-2 m-3" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket" /> &nbsp; Logout
          </Button>
          <Button
            className="px-4 py-2 m-3"
            onClick={() => navigate("/CreateNewMovieReview")}
          >
            <i className="fa-solid fa-plus" /> &nbsp; Create New Movie Review
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => navigate("/login")} className="px-4 py-2 m-3">
            {" "}
            <i className="fa-solid fa-right-to-bracket" /> &nbsp; Login
          </Button>
          <Button
            onClick={() => navigate("/sign-up")}
            className="px-4 py-2 m-3"
          >
            {" "}
            <i className="fa-solid fa-user-plus" /> &nbsp; Sign-Up
          </Button>
        </div>
      )}
    </section>
  );
}
