import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const submitLogin = (event) => {
    event.preventDefault();

    // setFormData({ username: "", password: "" });
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
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
      </Form>
    </div>
  );
}
