import React from "react";
import { NavLink } from "react-router-dom";

function FullList({ list, setList }) {
  return (
    <div>
      <NavLink to={"/"}>
        {" "}
        <button> To Home </button>{" "}
      </NavLink>

      <button onClick={() => setList([])}> Clear All</button>

      {list &&
        list.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: "thick",
              }}
            >
              <h1> {index + 1} </h1>
              <ul>
                {Object.keys(item).map((key) => (
                  <li key={key}> {item[key]} </li>
                ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default FullList;
