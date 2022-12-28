import React from "react";
import {Link, Navigate, NavLink, useLocation} from "react-router-dom";

function Detail({list, setList}) {
  const loc = useLocation();

  function remove() {
    setList(list.filter((item,index) => loc.state.id != index));
    // <Link to={"/"}></Link>
  }
  return (
    <div>
      <NavLink to={"/"}>
        {" "}
        <button> To Home </button>{" "}
      </NavLink>

      <ul>
        {" "}
        {Object.keys(loc.state.item).map((key, index) => (
          <li key={index}> {loc.state.item[key]} </li>
        ))}{" "}
      </ul>
      <NavLink to={"/"}> <button onClick={remove}> remove </button> </NavLink>

      {/* <p>  {loc.data && loc.data.title} </p> */}
    </div>
  );
}

export default Detail;
