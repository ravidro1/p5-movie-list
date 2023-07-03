import {
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_TOKEN_USER,
  SIGNUP_USER,
} from "../Consts/UserConsts";

import { UPDATE_USER_MOVIE_RATES_USER } from "../Consts/OneRateConsts";

const UserReducer = (state = { token: null, userRates: null }, action) => {
  switch (action.type) {
    case SIGNUP_USER:
    case REFRESH_TOKEN_USER:
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.accessToken,
        currentUserID: action.payload.currentUserID,
      };
    case LOGOUT_USER:
      return { ...state, token: null, userRates: null, currentUserID: null };

    case UPDATE_USER_MOVIE_RATES_USER:
      return { ...state, userRates: action.payload.userMovieRates };

    default:
      console.log("UserReducer default case");
      return state;
  }
};

export default UserReducer;
