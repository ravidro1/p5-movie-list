import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        width: "70px",
        height: "70px",
      }}
      className="spin-animation m-5"
    >
      <img src="/loading-spinner.svg" />
    </div>
  );
}
