import React from "react";

export default function ShowCategories({ categories }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {categories?.map((category, index) => {
        return (
          <div
            className="py-2 px-5 rounded"
            style={{
              backgroundColor: "#fff",
              width: "fit-content",
              color: "#000",
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
