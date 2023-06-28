import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MultiSelect from "./MultiSelect";
import { categories } from "../Global/globalConsts";
import { useDispatch } from "react-redux";
import { searchMovieReviews } from "../Redux/Actions/MovieReviewAction";

export default function SearchMovie() {
  const [searchData, setSearchData] = useState({ name: "", categories: "" });

  const dispatch = useDispatch();

  const searchSubmit = async (event) => {
    event.preventDefault();
    console.log(searchData);
    await dispatch(searchMovieReviews(searchData));

    setSearchData({ name: "", categories: "" });
  };

  return (
    <Form
      onSubmit={searchSubmit}
      className="d-flex my-4"
      style={{ width: "50%" }}
    >
      <Form.Control
        value={searchData.name}
        onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
        className="shadow-none"
        style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
        placeholder="Movie Name..."
      />{" "}
      <MultiSelect
        values={searchData.categories}
        onchange={(value) =>
          setSearchData({ ...searchData, categories: value })
        }
        title="Categories"
        options={categories}
        style={{
          borderRadius: "0",
          width: "200px",
          height: "40px",
        }}
      />
      <Button
        type="submit"
        style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
      >
        {" "}
        Search{" "}
      </Button>
    </Form>
  );
}
