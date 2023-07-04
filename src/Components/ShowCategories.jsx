import React from "react";

export default function ShowCategories({ categories }) {
  return (
    <div
      style={{ maxWidth: "95%" }}
      className="d-flex flex-wrap gap-2 align-align-items-stretch justify-content-center"
    >
      {categories?.map((category, index) => {
        return (
          <div
            className="py-2 rounded text-center"
            style={{
              backgroundColor: "#000",
              width: "fit-content",
              color: "#fff",
              minWidth: "100px",
              maxWidth: "100%",
            }}
            key={index}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
}
