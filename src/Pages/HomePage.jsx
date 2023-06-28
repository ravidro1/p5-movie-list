import React from "react";

import MoviesReviewSection from "../Components/MoviesReviewSection";
import SearchMovie from "../Components/SearchMovie";

import HomePageTopBar from "../Components/HomePageTopBar";

function HomePage({}) {
  return (
    <div
      // style={{ overflow: "hidden" }}
      className="w-100 h-100 d-flex flex-column justify-content-start align-items-center"
    >
      <HomePageTopBar />
      <h1>Movie Reviews:</h1>
      <SearchMovie />
      <MoviesReviewSection />
    </div>
  );
}

export default HomePage;
