import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createMovieReview } from "../Redux/Actions/MovieReviewAction";
import MultiSelect from "./MultiSelect";
import { categories } from "../Global/globalConsts";
import { uploadImage } from "../Global/globalFunctions";
import { useNavigate } from "react-router-dom";

export default function AddNewMovieReviewForm() {
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    releaseDate: "",
    categories: [],
    image: null,
  });
  const navigate = useNavigate();

  const pictureRef = useRef();

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

      console.log(copyInputData);
      await dispatch(createMovieReview(copyInputData));

      setInputData({
        name: "",
        description: "",
        releaseDate: "",
        categories: [],
        pictureUrl: null,
      });

      navigate("/");
      if (pictureRef && pictureRef.current) pictureRef.current.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  // const [te, sete] = useState(null);
  // console.log(te);
  return (
    <div
      style={{ height: "90%" }}
      className="w-100 d-flex flex-column justify-content-around align-items-center"
    >
      {/* <input
        onChange={uploadImage}
        type="file"
        // ref={pictureRef}
      /> */}
      {/* <img src={te} alt="" width={"500px"} height={"500px"} /> */}
      <h1 className="text-center">Add New Movie Review:</h1>
      <Form
        onSubmit={createNewMovieReview}
        className="d-flex flex-column flex-wrap justify-content-center gap-2"
        style={{ width: "80%" }}
      >
        <Form.Control
          style={{
            height: "80px",
          }}
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
          className="shadow-none"
          placeholder="Movie Name"
          required
        />
        <Form.Control
          as={"textarea"}
          style={{
            height: "200px",
            resize: "none",
          }}
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
            // width: "200px",
            height: "80px",
          }}
          onchange={(value) =>
            setInputData({ ...inputData, categories: value })
          }
        />

        {/* <Form.Switch></Form.Switch> */}
        <Form.Control
          style={{
            height: "80px",
          }}
          value={inputData.releaseDate}
          onChange={(e) =>
            setInputData({ ...inputData, releaseDate: e.target.value })
          }
          type="date"
          className="shadow-none"
          placeholder="Release Date"
        />
        <Form.Control
          ref={pictureRef}
          onChange={(e) =>
            uploadImage(
              e,
              (result) => setInputData({ ...inputData, image: result }),
              () => {
                if (pictureRef && pictureRef.current)
                  pictureRef.current.value = null;
              }
            )
          }
          size="lg"
          className="shadow-none"
          placeholder="pic"
          type="file"
        />
        <Button
          style={{
            height: "60px",
          }}
          type="submit"
        >
          {" "}
          <i className="fa-solid fa-plus" /> &nbsp; Create{" "}
        </Button>
      </Form>
    </div>
  );
}
