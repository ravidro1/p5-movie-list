import React, { useState } from "react";
import AddNewMovieReviewForm from "../Components/AddNewMovieReviewForm";
import MovieDetailWindow from "../Components/MovieDetailWindow";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom/dist";

export default function CreateNewMovieReview() {
  const navigate = useNavigate();

  const [newMovieDate, setNewMovieDate] = useState({});
  return (
    <div className="w-100 h-100 d-flex flex-column  align-items-center">
      <AddNewMovieReviewForm />
      <Button onClick={() => navigate("/")}>
        {" "}
        <i className="fa-solid fa-house" /> &nbsp; Go Back To Home Page
      </Button>

      {/* <div className="MovieDetailWindow-main m-5">
        <div className="MovieDetailWindow-contentSection ">
          <section className="MovieDetailWindow-img">
            <Form.Control size="lg" type="file" />
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
              <h1>{name}</h1>
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
      </div> */}
    </div>
  );
}
