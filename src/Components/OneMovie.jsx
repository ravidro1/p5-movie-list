import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom/dist";

export default function OneMovie({ movieData = {} }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    numberOfRate,
    averageRateScore,
    releaseDate,
    description,
    categories,
  } = movieData;

  return (
    <Card className="mx-5 my-3" style={{ width: "20rem" }}>
      <Card.Img variant="top" src="/logo512.png" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{name}</Card.Title>

        <Card.Text>{description} </Card.Text>
        <Card.Text>{categories?.toString()}</Card.Text>
        <Card.Text>
          {releaseDate != null
            ? Intl.DateTimeFormat("he-IL").format(new Date(releaseDate))
            : "--"}
        </Card.Text>
        <Rating
          rate={averageRateScore}
          movieID={id}
          numberOfRate={numberOfRate}
        />
        <Button onClick={() => navigate("")}>Go To Reviews</Button>
        <Button variant="danger">X</Button>
      </Card.Body>
    </Card>
  );
}
