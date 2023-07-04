import axios from "axios";
import {
  UPDATE_MOVIE_REVIEW_AFTER_ACTION_IN_ONE_RATE,
  UPDATE_USER_MOVIE_RATES_USER,
} from "../Consts/OneRateConsts";
import { getUserRates } from "../store";

const updateUserMovieRates = async (dispatch, token) => {
  const userMovieRates = await getUserRates(token);

  dispatch({
    type: UPDATE_USER_MOVIE_RATES_USER,
    payload: { userMovieRates },
  });
};

export const createOrUpdateOneRate =
  ({ movie_id, rate }) =>
  async (dispatch, getState) => {
    try {
      const token = getState()?.UserReducer?.token;
      const { data } = await axios.post(
        "/oneRate/createOrUpdateOneRate",
        {
          movie_id,
          rate,
        },
        {
          headers: { "x-access-token": token },
        }
      );

      dispatch({
        type: UPDATE_MOVIE_REVIEW_AFTER_ACTION_IN_ONE_RATE,
        payload: {
          updateMovie: data.updateMovie,
        },
      });

      await updateUserMovieRates(dispatch, token);
    } catch (error) {
      console.error(error);
    }
  };

export const deleteOneRate =
  ({ movie_id }) =>
  async (dispatch, getState) => {
    try {
      const token = getState()?.UserReducer?.token;

      const { data } = await axios.post(
        "/oneRate/deleteOneRate",
        {
          movie_id,
        },
        {
          headers: { "x-access-token": token },
        }
      );

      dispatch({
        type: UPDATE_MOVIE_REVIEW_AFTER_ACTION_IN_ONE_RATE,
        payload: {
          updateMovie: data.updateMovie,
        },
      });

      await updateUserMovieRates(dispatch, token);
    } catch (error) {
      console.error(error);
    }
  };
