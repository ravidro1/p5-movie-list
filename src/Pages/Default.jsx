import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Default() {
  const navigate = useNavigate();
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-around align-items-center">
      <h1>
        <strong> 404 </strong> Page Not Found
      </h1>

      <Button
        onClick={() => navigate("/")}
        size="lg"
        className="my-5"
        style={{ width: "30%" }}
      >
        Home Page
      </Button>
    </div>
  );
}

export default Default;
