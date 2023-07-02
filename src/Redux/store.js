import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import UserReducer from "./Reducers/UserReducer";
import MovieReviewReducer from "./Reducers/MovieReviewReducer";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const refreshToken = async () => {
  try {
    const { data } = await axios.get("/user/refresh-token", {
      withCredentials: true,
    });
    // console.log(data);
    return data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllMovieReviews = async () => {
  try {
    const { data } = await axios.get("/movieReview/getAllMovieReviews");
    return data.movieReviewsList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserRates = async (token) => {
  try {
    const { data } = await axios.get("/oneRate/searchForUserRates", {
      headers: { "x-access-token": token },
    });
    return data.userMovieRates;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const token = await refreshToken();

const reducer = combineReducers({
  UserReducer,
  MovieReviewReducer,
});

const initialState = {
  UserReducer: {
    token,
    userRates: await getUserRates(token),
  },
  MovieReviewReducer: { movieReviewsList: await getAllMovieReviews() },
};

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
