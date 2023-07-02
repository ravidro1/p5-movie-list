import axios from "axios";
import {
  CREATE_MOVIE_REVIEW,
  DELETE_MOVIE_REVIEW,
  GET_ALL_MOVIE_REVIEW,
  GET_MOVIE_REVIEW,
  SEARCH_MOVIE_REVIEW,
  UPDATE_MOVIE_REVIEW,
} from "../Consts/MovieReviewConsts";

export const createMovieReview = (inputData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/movieReview/createMovie", inputData);

    console.log(data);

    dispatch({
      type: CREATE_MOVIE_REVIEW,
      payload: {
        newMovie: data.newMovie,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllMovieReviews = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/movieReview/getAllMovieReviews");

    console.log(data);

    dispatch({
      type: GET_ALL_MOVIE_REVIEW,
      payload: {
        movieReviewsList: data.movieReviewsList,
      },
    });
  } catch (error) {
    console.error(error);
  }
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
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

export const deleteMovieReview =
  ({ movie_id }) =>
  async (dispatch) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

export const updateMovieReview = (editData) => async (dispatch) => {
  try {
    console.log(editData);

    const { data } = await axios.post("/movieReview/updateMovie", editData);

    console.log(data);

    dispatch({
      type: UPDATE_MOVIE_REVIEW,
      payload: {
        editedMovie: data.editedMovie,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
