import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "../Components/Rating";

function HomePage({ list, setList }) {
  const navigate = useNavigate();

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <h1> Home Page </h1>
      <Form className="d-flex ">
        <Form.Control className="shadow-none" placeholder="Movie Name" />
        <Form.Control className="shadow-none" placeholder="Rate" />
        <Form.Control className="shadow-none" placeholder="pic" type="file" />
        <Button> Rate </Button>
      </Form>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="/logo512.png" />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>movie name</Card.Title>
          <Card.Text>movie description</Card.Text>
          <Card.Text>movie year</Card.Text>
          <Card.Text>category</Card.Text>
          <Rating rate={3} />
          <Button onClick={() => navigate("")}>Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;
