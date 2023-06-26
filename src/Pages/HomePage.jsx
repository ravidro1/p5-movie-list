import React from "react";
import { Button } from "react-bootstrap";

import MoviesReviewSection from "../Components/MoviesReviewSection";
import AddNewMovieReviewForm from "../Components/AddNewMovieReviewForm";

function HomePage({}) {
  return (
    <div
      // style={{ overflow: "hidden" }}
      className="w-100 h-100 d-flex flex-column justify-content-start align-items-center"
    >
      <Button>Logout</Button>
      <AddNewMovieReviewForm />

      <MoviesReviewSection />
    </div>
  );
}

export default HomePage;
