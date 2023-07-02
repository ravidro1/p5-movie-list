import {
  CREATE_MOVIE_REVIEW,
  DELETE_MOVIE_REVIEW,
  GET_ALL_MOVIE_REVIEW,
  GET_MOVIE_REVIEW,
  SEARCH_MOVIE_REVIEW,
  UPDATE_MOVIE_REVIEW,
} from "../Consts/MovieReviewConsts";

import { UPDATE_MOVIE_REVIEW_AFTER_ACTION_IN_ONE_RATE } from "../Consts/OneRateConsts";

const MovieReviewReducer = (state = { movieReviewsList: [] }, action) => {
  switch (action.type) {
    case CREATE_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: [...state.movieReviewsList, action.payload.newMovie],
      };
    case DELETE_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: state.movieReviewsList.filter(
          (movie) => movie.id != action.payload.movie_id
        ),
      };
    case GET_ALL_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: action.payload.movieReviewsList,
      };
    // case GET_MOVIE_REVIEW:

    case SEARCH_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: action.payload.movieReviewsList,
      };

    case UPDATE_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: state.movieReviewsList.map((movie) => {
          if (movie.id == action.payload.editedMovie.id)
            return action.payload.editedMovie;
          return movie;
        }),
      };

    case UPDATE_MOVIE_REVIEW_AFTER_ACTION_IN_ONE_RATE:
      return {
        ...state,
        movieReviewsList: state.movieReviewsList.map((movie) => {
          if (movie.id == action.payload.updateMovie.id)
            return action.payload.updateMovie;
          return movie;
        }),
      };
    default:
      console.log("MovieReviewReducer default case");
      return state;
  }
};

export default MovieReviewReducer;
