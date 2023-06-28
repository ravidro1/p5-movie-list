import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import Rating from "./Rating";
import { deleteMovieReview } from "../Redux/Actions/MovieReviewAction";
import { formatTime } from "../Global/globalFunctions";
import ShowCategories from "./ShowCategories";
import MultiSelect from "./MultiSelect";
import { categories as importCategories } from "../Global/globalConsts";

export default function MovieDetailWindow({ movieData }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.UserReducer);

  const {
    averageRateScore,
    numberOfRate,
    id,
    description,
    releaseDate,
    name,
    categories,
  } = movieData;

  const [isInEditMode, setIsInEditMode] = useState(false);

  const [editData, setEditData] = useState({
    name,
    description,
    releaseDate,
    categories,
  });

  const deleteMovie = async () => {
    await dispatch(deleteMovieReview({ movie_id: id }));
    navigate("/");
  };

  const submitEdit = () => {
    console.log("submitEdit");
  };

  const enterEditMode = () => {
    if (!isInEditMode) {
      setIsInEditMode(true);
      setEditData({
        name,
        description,
        releaseDate,
        categories,
      });
    }
  };

  console.log(editData);

  const formatTimeForInput = (date) => {
    const dateObj = new Date(date);

    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const today = year + "-" + month + "-" + day;
    return today;
  };

  return (
    <div
      className="rounded p-4 d-flex flex-column"
      style={{
        width: "95%",
        height: "70vh",
        backgroundColor: "#343a40",
        color: "#fff",
      }}
    >
      <div className="d-flex justify-content-end ">
        {token && (
          <>
            <Button className="m-2" onClick={deleteMovie} variant="danger">
              <i className="fa-sharp fa-solid fa-trash" />
            </Button>
            <Button onClick={enterEditMode} variant="success" className="m-2">
              <i className="fa-solid fa-pen-to-square" />
            </Button>
          </>
        )}
        <Button className="m-2" onClick={() => navigate("/")}>
          <i className="fa-solid fa-house" />
        </Button>
      </div>

      <div className="d-flex ">
        <section style={{ width: "50%" }}>
          <img className="" src="/logo512.png" alt="" />
          {isInEditMode && <Form.Control type="file" />}
        </section>
        <section
          className="d-flex flex-column flex-wrap gap-5 py-4"
          //   className="d-flex flex-column justify-content-around"
          style={{ width: "50%" }}
        >
          {isInEditMode ? (
            <Form.Control
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="shadow-none"
              placeholder="Movie Name"
            />
          ) : (
            <h1>{name}</h1>
          )}
          {isInEditMode ? (
            <Form.Control
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Description"
              style={{ resize: "none" }}
              as={"textarea"}
              className="shadow-none"
            />
          ) : (
            <p>{description ? description : "--"}</p>
          )}
          {isInEditMode ? (
            <Form.Control
              value={formatTimeForInput(editData?.releaseDate)}
              onChange={(e) =>
                setEditData({ ...editData, releaseDate: e.target.value })
              }
              type="date"
              className="shadow-none"
            />
          ) : (
            <p>{releaseDate != null ? formatTime(releaseDate) : "--"} </p>
          )}

          <Rating
            size="30px"
            movieID={id}
            numberOfRate={numberOfRate}
            rate={averageRateScore}
          />
          {isInEditMode ? (
            <MultiSelect
              values={editData.categories}
              onchange={(value) =>
                setEditData({ ...editData, categories: value })
              }
              style={{ color: "#000" }}
              options={importCategories}
            />
          ) : (
            <ShowCategories categories={categories} />
          )}
          {isInEditMode && (
            <div className="">
              <Button onClick={submitEdit} variant="danger">
                {" "}
                Submit Edit{" "}
              </Button>
              <Button onClick={() => setIsInEditMode(false)}> Cancel </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
