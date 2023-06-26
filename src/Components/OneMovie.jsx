import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom/dist";

export default function OneMovie({ movieData = {} }) {
  const navigate = useNavigate();
  const { id, name, numberOfRate, averageRateScore } = movieData;

  return (
    <Card className="mx-5 my-3" style={{ width: "20rem" }}>
      <Card.Img variant="top" src="/logo512.png" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{} </Card.Text>
        <Card.Text>{}</Card.Text>
        <Card.Text>{}</Card.Text>
        {/* <Card.Text>{numberOfRate;; && description} </Card.Text>
        <Card.Text>{category && category}</Card.Text>
        <Card.Text>{releaseDate && releaseDate}</Card.Text> */}
        <Rating
          rate={averageRateScore}
          movieID={id}
          numberOfRate={numberOfRate}
        />
        <Button onClick={() => navigate("")}>Go To Reviews</Button>
      </Card.Body>
    </Card>
  );
}
