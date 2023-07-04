import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/dist";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

import OneComment from "./OneComment";

export default function MovieCommentSection() {
  const [currentMovieComments, setCurrentMovieComments] = useState([]);

  const { state } = useLocation();
  const movieID = state?.id;
  const { token, currentUserID } = useSelector((state) => state.UserReducer);

  const [isInCreateMode, setIsInCreateMode] = useState(false);
  const [tempNewCommentContent, setTempNewCommentContent] = useState("");

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
    try {
      const { data } = await axios.post(
        "/movieCommentRoutes/createMovieComment",
        {
          movie_id: movieID,
          content: tempNewCommentContent,
        },
        { headers: { "x-access-token": token } }
      );
      console.log(data.newComment);

      setCurrentMovieComments((prev) => [data.newComment, ...prev]);
    } catch (error) {
      console.error(error);
      // setCurrentMovieComments([]);
    } finally {
      setIsInCreateMode(false);
    }
  };

  return (
    <div className="d-flex flex-column " style={{ width: "95%" }}>
      {token &&
        (isInCreateMode ? (
          <>
            <Form.Control
              value={tempNewCommentContent}
              onChange={(e) => setTempNewCommentContent(e.target.value)}
              placeholder="New Comment Content"
              className="shadow-none my-2"
              style={{ resize: "none" }}
              as="textarea"
            />
            <Button onClick={addComments}>Create</Button>
          </>
        ) : (
          <Button title="Add Comment" onClick={() => setIsInCreateMode(true)}>
            {" "}
            <i className="fa-solid fa-plus" />{" "}
          </Button>
        ))}
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
