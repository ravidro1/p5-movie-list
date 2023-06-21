import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { UserReducer } from "./Reducers/UserReducer";
import axios from "axios";

const refreshToken = async () => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/user/refresh-token",
      { withCredentials: true }
    );
    console.log(data);
    return data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const reducer = combineReducers({ UserReducer });

// const initialState = {};
const initialState = { UserReducer: { token: await refreshToken() } };

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
