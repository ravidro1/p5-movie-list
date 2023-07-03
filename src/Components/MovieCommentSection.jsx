import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/dist";
import axios from "axios";
import { Button } from "react-bootstrap";

import OneComment from "./OneComment";

export default function MovieCommentSection() {
  const [currentMovieComments, setCurrentMovieComments] = useState([]);

  const { state } = useLocation();
  const movieID = state?.id;
  const { token, currentUserID } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    getCurrentMovieComments();
  }, []);

  const getCurrentMovieComments = async () => {
    try {
      const { data } = await axios.post("/movieCommentRoutes/getByMovieId", {
        movie_id: movieID,
      });
      setCurrentMovieComments(data.commentList);
    } catch (error) {
      console.error(error);
      setCurrentMovieComments([]);
    }
  };

  const addComments = async () => {
    const content = "hey123";
    try {
      const { data } = await axios.post(
        "/movieCommentRoutes/createMovieComment",
        {
          movie_id: movieID,
          content,
        },
        { headers: { "x-access-token": token } }
      );
      console.log(data.newComment);

      setCurrentMovieComments((prev) => [...prev, data.newComment]);
    } catch (error) {
      console.error(error);
      setCurrentMovieComments([]);
    }
  };

  return (
    <div style={{ width: "95%" }}>
      <Button onClick={addComments}>create</Button>
      {currentMovieComments?.map((item, index) => {
        return (
          <OneComment
            key={index}
            comment={item}
            setCurrentMovieComments={setCurrentMovieComments}
            token={token}
            currentUserID={currentUserID}
          />
        );
      })}
    </div>
  );
}
