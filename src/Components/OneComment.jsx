import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function OneComment({
  comment,
  token,
  setCurrentMovieComments,
  currentUserID,
}) {
  const { username, content, id, user_id } = comment;

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [tempContent, setTempContent] = useState("");

  const [userComment, setUserComment] = useState(false);

  useEffect(() => {
    setUserComment(user_id == currentUserID);
  }, [currentUserID]);

  const editComment = async (content) => {
    if (!userComment) return;

    try {
      const { data } = await axios.post(
        "/movieCommentRoutes/updateMovieComment",
        {
          comment_id: id,
          content,
        },
        { headers: { "x-access-token": token } }
      );

      setCurrentMovieComments((prev) =>
        prev.map((item) => {
          if (item.id == id) return data.editedItem;
          return item;
        })
      );
    } catch (error) {
      console.error(error);
      setCurrentMovieComments([]);
    }
  };

  const deleteComment = async () => {
    if (!userComment) return;

    try {
      await axios.post(
        "/movieCommentRoutes/deleteMovieComment",
        {
          comment_id: id,
        },
        { headers: { "x-access-token": token } }
      );

      setCurrentMovieComments((prev) => prev.filter((item) => item.id != id));
    } catch (error) {
      console.error(error);
      setCurrentMovieComments([]);
    }
  };

  const changeEditState = async () => {
    if (isInEditMode) {
      await editComment(tempContent);
    } else {
      setTempContent(content);
    }
    setIsInEditMode((prev) => !prev);
  };

  return (
    <div
      className="my-3 border p-3"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 20px -5px #000000",
      }}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5>{username}</h5>
        {userComment && (
          <div>
            <Button
              onClick={changeEditState}
              title="Edit Comment"
              variant="success"
              className="m-2"
            >
              <i className="fa-solid fa-pen-to-square" />
            </Button>
            <Button
              onClick={deleteComment}
              title="Delete Comment"
              className="m-2"
              variant="danger"
            >
              <i className="fa-sharp fa-solid fa-trash" />
            </Button>
          </div>
        )}
      </div>

      {isInEditMode ? (
        <Form.Control
          className="shadow-none"
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          as="textarea"
          placeholder="Content"
          style={{ resize: "none" }}
        ></Form.Control>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
}
