import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createMovieReview } from "../Redux/Actions/MovieReviewAction";
import MultiSelect from "./MultiSelect";
import { categories } from "../Global/globalConsts";
import { useNavigate } from "react-router-dom/dist";

export default function AddNewMovieReviewForm() {
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    releaseDate: "",
    categories: [],
  });

  const dispatch = useDispatch();

  const createNewMovieReview = async (event) => {
    try {
      event.preventDefault();

      const copyInputData = { ...inputData };
      Object.keys(inputData).map((key) => {
        if (typeof inputData[key] == "boolean") return;

        if (
          !inputData[key] ||
          (Array.isArray(inputData[key]) && inputData[key]?.length == 0)
        ) {
          copyInputData[key] = null;
        }
      });

      await dispatch(createMovieReview(copyInputData));

      //   setInputData({
      //     name: "",
      //     description: "",
      //     releaseDate: "",
      //     categories: [],
      //   });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className="text-center">Add New Movie Review:</h1>
      <Form
        // style={{ width: "80%" }}
        onSubmit={createNewMovieReview}
        className="d-flex flex-wrap justify-content-center gap-2"
      >
        <Form.Control
          style={{ width: "200px", height: "40px" }}
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
          className="shadow-none"
          placeholder="Movie Name"
          required
        />
        <Form.Control
          style={{ width: "200px", height: "40px" }}
          value={inputData.description}
          onChange={(e) =>
            setInputData({ ...inputData, description: e.target.value })
          }
          className="shadow-none"
          placeholder="Description"
        />
        <MultiSelect
          values={inputData.categories}
          title={"Categories"}
          options={categories}
          style={{
            width: "200px",
            height: "40px",
          }}
          onchange={(value) =>
            setInputData({ ...inputData, categories: value })
          }
        />

        {/* <Form.Switch></Form.Switch> */}
        <Form.Control
          style={{ width: "200px", height: "40px" }}
          value={inputData.releaseDate}
          onChange={(e) =>
            setInputData({ ...inputData, releaseDate: e.target.value })
          }
          type="date"
          className="shadow-none"
          placeholder="Release Date"
        />
        {/* <Form.Control className="shadow-none" placeholder="pic" type="file" /> */}
        <Button style={{ width: "200px", height: "40px" }} type="submit">
          {" "}
          Create{" "}
        </Button>
      </Form>
    </>
  );
}
