import React from "react";
import { useLocation } from "react-router-dom";
import MovieCommentSection from "../Components/MovieCommentSection";
import MovieDetailWindow from "../Components/MovieDetailWindow";

function MovieDetail({}) {
  const { state } = useLocation();

  return (
    <div className="w-100 h-100 d-flex justify-content-around align-items-center flex-column">
      <MovieDetailWindow movieData={state} />
      <MovieCommentSection />
    </div>
  );
}

export default MovieDetail;
