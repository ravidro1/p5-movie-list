import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { signUpUser } from "../Redux/Actions/UserAction";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [formData]);

  const dispatch = useDispatch();

  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(signUpUser(formData));
      setFormData({ username: "", password: "", verifyPassword: "" });
    } catch (error) {
      console.error(error);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage("The Data You Entered Is Incorrect");
      } else {
        setErrorMessage("Something Went Wrong");
      }
    }
  };

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
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
          height: "60%",
          boxShadow: "5px 5px 23px 5px rgba(0,0,0,0.6)",
        }}
        className="rounded d-flex flex-column align-items-center py-3"
      >
        <Form.Group className="my-2" style={{ width: "70%" }}>
          <Form.Label className="mx-2">Username:</Form.Label>
          <Form.Control
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="shadow-none w-100"
            placeholder="Username"
            size="lg"
            required
            minLength={8}
            maxLength={20}
          />{" "}
          <Form.Text className="mx-1 w-100" muted>
            Your Username must be 8-20 characters long.
          </Form.Text>
        </Form.Group>

        <Form.Group className="my-2" style={{ width: "70%" }}>
          <Form.Label className="mx-2">Password:</Form.Label>
          <Form.Control
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="shadow-none w-100 "
            type="password"
            placeholder="Password"
            size="lg"
            required
            minLength={8}
            maxLength={20}
          />
          <Form.Text className="mx-1 w-100" muted>
            Your password must be 8-20 characters long.
          </Form.Text>
        </Form.Group>
        <Form.Group className="my-2" style={{ width: "70%" }}>
          <Form.Label className="mx-2">Verify Password:</Form.Label>

          <Form.Control
            value={formData.verifyPassword}
            onChange={(e) =>
              setFormData({ ...formData, verifyPassword: e.target.value })
            }
            className="shadow-none w-100"
            type="password"
            placeholder="Verify Password"
            size="lg"
            required
            pattern={formData.password}
          />
          <Form.Text className="mx-1 w-100" muted>
            Your Verify password must be equal to password.
          </Form.Text>
        </Form.Group>
        <Button
          type="submit"
          size="lg"
          className="my-3"
          style={{ width: "70%" }}
        >
          SIGN-UP
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="link"
          size=""
          className=""
          style={{ width: "70%" }}
        >
          Already Register? Go To Login
        </Button>
      </Form>
    </div>
  );
}
