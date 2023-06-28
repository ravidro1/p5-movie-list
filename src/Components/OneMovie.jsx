import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom/dist";
import { formatTime } from "../Global/globalFunctions";

export default function OneMovie({ movieData = {} }) {
  const navigate = useNavigate();
  const { id, name, numberOfRate, averageRateScore, releaseDate, categories } =
    movieData;

  return (
    <Card className="mx-5 my-3" style={{ width: "20rem" }}>
      <Card.Img variant="top" src="/logo512.png" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{name}</Card.Title>

        <Card.Text>
          Categories: {categories?.length > 0 ? categories?.toString() : "--"}
        </Card.Text>
        <Card.Text>
          Release Date: {releaseDate != null ? formatTime(releaseDate) : "--"}
        </Card.Text>
        <Rating
          rate={averageRateScore}
          movieID={id}
          numberOfRate={numberOfRate}
        />
        <Button
          onClick={() =>
            navigate(`/movieDetail/${name?.replaceAll(" ", "-")}`, {
              state: movieData,
            })
          }
        >
          Go To Reviews
          <i class="fa-solid fa-circle-info"></i>
        </Button>
      </Card.Body>
    </Card>
  );
}
