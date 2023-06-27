import React from "react";
import { Button, Form } from "react-bootstrap";
import MultiSelect from "./MultiSelect";
import { categories } from "./globalConsts";

export default function SearchMovie() {
  return (
    <Form className="d-flex my-4" style={{ width: "50%" }}>
      <Form.Control
        className="shadow-none"
        style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
        placeholder="Movie Name..."
      />{" "}
      <MultiSelect
        title="Categories"
        options={categories}
        style={{
          borderRadius: "0",
          width: "200px",
          height: "40px",
        }}
      />
      <Button style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
        {" "}
        Search{" "}
      </Button>
    </Form>
  );
}
