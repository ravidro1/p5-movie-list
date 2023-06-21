import axios from "axios";
import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  REFRESH_TOKEN_USER,
} from "../Consts/UserConsts";

export const signUpUser = (formData) => async (dispatch, getState) => {
  const { data } = await axios.post("/user/sign-up", formData);

  dispatch({
    type: SIGNUP_USER,
    payload: {
      accessToken: data.accessToken,
    },
  });
};

export const loginUser = (formData) => async (dispatch, getState) => {
  //   try {

  const { data } = await axios.post("/user/login", formData);

  dispatch({
    type: LOGIN_USER,
    payload: {
      accessToken: data.accessToken,
    },
  });

  //   return Promise.resolve();
  //   } catch (error) {
  //     // return error;
  //     return Promise.reject();
  //   }
};

export const logoutUser = (formData) => async (dispatch, getState) => {
  await axios.delete("/user/logout", formData);

  dispatch({
    type: LOGOUT_USER,
    payload: {},
  });
};

export const refreshTokenUser = () => async (dispatch, getState) => {
  console.log("refresh1");
  const res = await axios.get("/user/refresh-token");
  console.log("refresh2");

  dispatch({
    type: REFRESH_TOKEN_USER,
    payload: {
      accessToken: res.data.accessToken,
    },
  });
  return { status: res.status, token: res.data.accessToken };
};
