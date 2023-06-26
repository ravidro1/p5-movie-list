import {
  CREATE_MOVIE_REVIEW,
  DELETE_MOVIE_REVIEW,
  GET_ALL_MOVIE_REVIEW,
  GET_MOVIE_REVIEW,
} from "../Consts/MovieReviewConsts";

const MovieReviewReducer = (state = { movieReviewsList: [] }, action) => {
  switch (action.type) {
    case CREATE_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: [...state.movieReviewsList, action.payload.newMovie],
      };
    case DELETE_MOVIE_REVIEW:
    case GET_ALL_MOVIE_REVIEW:
      return {
        ...state,
        movieReviewsList: action.payload.movieReviewsList,
      };
    case GET_MOVIE_REVIEW:

    default:
      console.log("MovieReviewReducer default case");
      return state;
  }
};

export default MovieReviewReducer;
