import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom/dist";
import { formatDate } from "../Global/globalFunctions";

export default function OneMovie({ movieData = {} }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    numberOfRate,
    averageRateScore,
    releaseDate,
    categories,
    normalizeName,
    pictureURL,
  } = movieData;

  return (
    <Card className="oneMovie-main">
      {pictureURL ? (
        <Card.Img variant="top" src={pictureURL} />
      ) : (
        <Card.Img variant="top" src="/defaultImage.svg" />
      )}
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{name}</Card.Title>

        <Card.Text>
          Categories: {categories?.length > 0 ? categories?.toString() : "--"}
        </Card.Text>
        <Card.Text>
          Release Date: {releaseDate != null ? formatDate(releaseDate) : "--"}
        </Card.Text>
        <Rating
          rate={averageRateScore}
          movieID={id}
          numberOfRate={numberOfRate}
        />
        <Button
          onClick={() =>
            navigate(`/movieDetail/${normalizeName}`, {
              state: { id },
            })
          }
        >
          Go To Reviews
          {/* <i className="fa-solid fa-circle-info"></i> */}
        </Button>
      </Card.Body>
    </Card>
  );
}
