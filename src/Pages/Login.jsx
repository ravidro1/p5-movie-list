import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom/dist";
import { loginUser, logoutUser } from "../Redux/Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [formData]);

  const dispatch = useDispatch();

  const submitLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(formData));
      // setFormData({ username: "", password: "" });
    } catch (error) {
      console.error(error);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage("The Data You Entered Is Incorrect");
      } else {
        setErrorMessage("Something Went Wrong");
      }
    }
  };

  // const { token } = useSelector((state) => state.UserReducer);

  // const test = async () => {
  //   try {
  //     const { data } = await axios.get("/user/is-token-verify", {
  //       headers: { "x-access-token": token },
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const logout = () => {
  //   dispatch(logoutUser());
  // };

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      {/* <Button onClick={test}>test</Button>
      <Button onClick={logout}>logout</Button> */}
      {errorMessage && (
        <Alert style={{ width: "35%" }} variant="danger">
          {errorMessage}
        </Alert>
      )}
      <Form
        onSubmit={submitLogin}
        style={{
          backgroundColor: "#fff",
          width: "35%",
          height: "50%",
          boxShadow: "5px 5px 23px 5px rgba(0,0,0,0.6)",
        }}
        className="rounded d-flex flex-column align-items-center py-4"
      >
        <Form.Control
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          style={{ width: "65%" }}
          className="shadow-none mt-5 mb-2"
          placeholder="Username"
          size="lg"
          required
        />
        <Form.Control
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={{ width: "65%" }}
          className="shadow-none my-2"
          type="password"
          placeholder="Password"
          size="lg"
          required
        />
        <Button
          type="submit"
          size="lg"
          className="my-5"
          style={{ width: "65%" }}
        >
          LOGIN
        </Button>

        <div className="d-flex flex-wrap justify-content-around">
          <Button onClick={() => navigate("/sign-up")} variant="link" size="sm">
            Need New Account?
          </Button>
          <Button size="sm" variant="link" onClick={() => navigate("/")}>
            {" "}
            Skip Login - Guest Mode{" "}
          </Button>
        </div>
      </Form>
    </div>
  );
}
