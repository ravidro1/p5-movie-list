import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MultiSelect from "./MultiSelect";
import { categories } from "../Global/globalConsts";
import { useDispatch } from "react-redux";
import {
  restMovieReviewList,
  searchMovieReviews,
} from "../Redux/Actions/MovieReviewAction";

export default function SearchMovie({}) {
  const [searchData, setSearchData] = useState({ name: "", categories: "" });

  const dispatch = useDispatch();

  const searchSubmit = async (event) => {
    event.preventDefault();

    await dispatch(searchMovieReviews(searchData));

    setSearchData({ name: "", categories: "" });
  };

  return (
    <Form onSubmit={searchSubmit} className="searchMovie-main my-4">
      <Form.Control
        value={searchData.name}
        onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
        className="searchMovie-input shadow-none"
        placeholder="Movie Name..."
      />{" "}
      <div className="searchMovie-select">
        <MultiSelect
          values={searchData.categories}
          onchange={(value) =>
            setSearchData({ ...searchData, categories: value })
          }
          title="Categories"
          options={categories}
          style={{
            borderRadius: "0",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <Button className="searchMovie-button" type="submit">
        {" "}
        <i className="fa-solid fa-magnifying-glass" />{" "}
      </Button>
    </Form>
  );
}
