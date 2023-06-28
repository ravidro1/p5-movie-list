import axios from "axios";
import {
  CREATE_MOVIE_REVIEW,
  DELETE_MOVIE_REVIEW,
  GET_ALL_MOVIE_REVIEW,
  GET_MOVIE_REVIEW,
  SEARCH_MOVIE_REVIEW,
} from "../Consts/MovieReviewConsts";

export const createMovieReview = (inputData) => async (dispatch) => {
  const { data } = await axios.post("/movieReview/createMovie", inputData);

  console.log(data);

  dispatch({
    type: CREATE_MOVIE_REVIEW,
    payload: {
      newMovie: data.newMovie,
    },
  });
};

export const getAllMovieReviews = () => async (dispatch) => {
  const { data } = await axios.get("/movieReview/getAllMovieReviews");

  console.log(data);

  dispatch({
    type: GET_ALL_MOVIE_REVIEW,
    payload: {
      movieReviewsList: data.movieReviewsList,
    },
  });
};

// export const getNextTenMovieReviews = () => async (dispatch) => {
//   const { data } = await axios.get("/movieReview/getAllMovieReviews");

//   console.log(data);

//   dispatch({
//     type: GET_ALL_MOVIE_REVIEW,
//     payload: {
//       movieReviewsList: data.movieReviewsList,
//     },
//   });
// };

export const searchMovieReviews =
  ({ name, categories }) =>
  async (dispatch) => {
    const { data } = await axios.post(
      "/movieReview/searchMovieReviewsByNameAndCategories",
      {
        name,
        categories,
      }
    );

    console.log(data);

    dispatch({
      type: SEARCH_MOVIE_REVIEW,
      payload: {
        movieReviewsList: data.movieReviewsList,
      },
    });
  };

export const deleteMovieReview =
  ({ movie_id }) =>
  async (dispatch) => {
    const { data } = await axios.post("/movieReview/deleteMovie", {
      movie_id,
    });

    console.log(data);

    dispatch({
      type: DELETE_MOVIE_REVIEW,
      payload: {
        movie_id: movie_id,
      },
    });
  };
