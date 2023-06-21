import axios from "axios";
import Store from "../Redux/store";
import { refreshTokenUser } from "../Redux/Actions/UserAction";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

let oneTime = false;

axios.interceptors.response.use(
  (success) => {
    // console.log(oneTime, "s");
    return success;
  },
  async (error) => {
    // console.log(oneTime, "e");

    console.log(error, "error in interceptors");

    if (error?.response?.status == 401 && !oneTime) {
      oneTime = true;
      const { token, status } = await Store.dispatch(refreshTokenUser());

      if (status >= 200 && status < 300) {
        const res = await axios({
          ...error.config,
          headers: { ...error?.config?.headers, "x-access-token": token },
        });
        if (res.status >= 200 && res.status < 300) {
          oneTime = false;
        }

        return Promise.resolve(res);
      }
    }

    oneTime = false;

    return Promise.reject();
  }
);
