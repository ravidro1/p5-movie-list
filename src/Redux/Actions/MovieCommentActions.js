import axios from "axios";

export const getCurrentMovieComments =
  (movie_id) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/movieCommentRoutes/getByMovieId",
        { movie_id },
        { headers: { "x-access-token": getState()?.UserReducer?.token } }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
