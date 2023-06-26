import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createMovieReview } from "../Redux/Actions/MovieReviewAction";

export default function AddNewMovieReviewForm() {
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    releaseDate: "",
  });

  const dispatch = useDispatch();

  const createNewMovieReview = async (event) => {
    try {
      event.preventDefault();
      console.log(inputData);

      await dispatch(createMovieReview({ movieName: inputData.name }));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1>Add New Movie Review:</h1>
      <Form onSubmit={createNewMovieReview} className="d-flex ">
        <Form.Control
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
          className="shadow-none"
          placeholder="Movie Name"
          required
        />
        <Form.Control
          value={inputData.description}
          onChange={(e) =>
            setInputData({ ...inputData, description: e.target.value })
          }
          className="shadow-none"
          placeholder="Description"
        />
        <Form.Control
          value={inputData.releaseDate}
          onChange={(e) =>
            setInputData({ ...inputData, releaseDate: e.target.value })
          }
          type="date"
          className="shadow-none"
          placeholder="Release Date"
        />
        {/* <Form.Control className="shadow-none" placeholder="pic" type="file" /> */}
        <Button type="submit"> Create </Button>
      </Form>
    </>
  );
}
