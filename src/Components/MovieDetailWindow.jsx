import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom/dist";
import Rating from "./Rating";
import {
  deleteMovieReview,
  updateMovieReview,
} from "../Redux/Actions/MovieReviewAction";
import { formatDate, formatTime, uploadImage } from "../Global/globalFunctions";
import ShowCategories from "./ShowCategories";
import MultiSelect from "./MultiSelect";
import { categories as importCategories } from "../Global/globalConsts";

export default function MovieDetailWindow({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();

  const { token } = useSelector((state) => state.UserReducer);
  const { movieReviewsList } = useSelector((state) => state.MovieReviewReducer);

  const pictureRef = useRef();

  const [movieData, setMovieData] = useState({});

  const {
    averageRateScore,
    numberOfRate,
    id,
    description,
    releaseDate,
    name,
    categories,
    pictureURL,
  } = movieData;

  const [isInEditMode, setIsInEditMode] = useState(false);

  const [editData, setEditData] = useState({
    name,
    description,
    releaseDate,
    categories,
    pictureURL,
  });

  useEffect(() => {
    setMovieData(movieReviewsList.find((movie) => movie.id == state.id));
  }, [state.id, movieReviewsList]);

  const deleteMovie = async () => {
    await dispatch(deleteMovieReview({ movie_id: id }));
    navigate("/");
  };

  const submitEdit = () => {
    dispatch(updateMovieReview({ ...editData, id }));
  };

  const enterEditMode = () => {
    if (!isInEditMode) {
      setIsInEditMode(true);
      setEditData({
        name,
        description,
        releaseDate,
        categories,
        pictureURL,
      });
    }
  };

  const formatTimeForInput = (date) => {
    console.log(date, 634);
    if (date == null) return null;

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
    <div className="MovieDetailWindow-main m-5">
      <div className="d-flex justify-content-end flex-wrap">
        {token && (
          <>
            <Button
              title="Delete"
              className="m-2"
              onClick={deleteMovie}
              variant="danger"
            >
              <i className="fa-sharp fa-solid fa-trash" />
            </Button>
            <Button
              title="Edit"
              onClick={enterEditMode}
              variant="success"
              className="m-2"
            >
              <i className="fa-solid fa-pen-to-square" />
            </Button>
          </>
        )}
        <Button title="Home Page" className="m-2" onClick={() => navigate("/")}>
          <i className="fa-solid fa-house" />
        </Button>
      </div>

      <div className="MovieDetailWindow-contentSection ">
        <section className="MovieDetailWindow-img">
          <img
            style={{
              maxWidth: "100%",
              // , minWidth: "200px"
            }}
            src={pictureURL ? pictureURL : "/defaultImage.svg"}
            alt=""
          />
          {isInEditMode && (
            <Form.Control
              ref={pictureRef}
              onChange={(e) =>
                uploadImage(
                  e,
                  (result) => {
                    if (result != null)
                      setEditData({ ...editData, image: result });
                  },
                  () => {
                    if (pictureRef && pictureRef.current)
                      pictureRef.current.value = null;
                  }
                )
              }
              size="lg"
              className="shadow-none my-4"
              placeholder="pic"
              type="file"
            />
          )}
        </section>
        <section className="MovieDetailWindow-data">
          {isInEditMode ? (
            <Form.Control
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="shadow-none"
              placeholder="Movie Name"
              size="lg"
            />
          ) : (
            <h1 style={{ wordBreak: "break-all" }}>{name}</h1>
          )}
          {isInEditMode ? (
            <Form.Control
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Description"
              style={{ resize: "none", height: "120px", overflowY: "auto" }}
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
              size="lg"
            />
          ) : (
            <p>{releaseDate != null ? formatDate(releaseDate) : "--"} </p>
          )}

          <Rating
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
              style={{ color: "#000", height: "50px" }}
              options={importCategories}
            />
          ) : (
            <ShowCategories categories={categories} />
          )}
          {isInEditMode && (
            <div className="d-flex justify-content-around">
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
