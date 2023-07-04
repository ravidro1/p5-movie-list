import React from "react";

import MoviesReviewSection from "../Components/MoviesReviewSection";
import SearchMovie from "../Components/SearchMovie";

import HomePageTopBar from "../Components/HomePageTopBar";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";

function HomePage() {
  const { loading } = useSelector((state) => state.MovieReviewReducer);
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-start align-items-center">
      <HomePageTopBar />
      <h1 className="text-center">Movie Reviews:</h1>
      <SearchMovie />
      {loading ? <Loading /> : <MoviesReviewSection />}
    </div>
  );
}

export default HomePage;
