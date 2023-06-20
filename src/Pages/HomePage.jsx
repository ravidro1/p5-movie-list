import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

function HomePage({ list, setList }) {
  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [oneMovie, setOneMovie] = useState({});

  function onSubmit(data) {
    setOneMovie(data);
    setList([...list, data]);
    reset();
  }

  function removeFromList(index) {
    setList(list.filter((item, i) => i != index));
  }

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <span>
        <span>List Length: {list.length}</span>
        <button onClick={() => navigate("/fullList")}> To List </button>
      </span>
      <h1> Home Page </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={"text"}
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p> you need to insert title </p>}

        <input
          type={"text"}
          placeholder="Director"
          {...register("director", { required: true })}
        />
        {errors.director && <p> you need to insert director </p>}

        <input
          type={"number"}
          placeholder="Year"
          {...register("year", { required: true })}
        />
        {errors.year && <p> you need to insert year </p>}

        <input type={"submit"} />
      </form>

      {list.map((item, index) => {
        return (
          <li key={index}>
            {item.title}
            <button
              onClick={() =>
                navigate(`/detail/${item.title}`, {
                  state: { item: item, id: index },
                })
              }
            >
              {" "}
              Detail{" "}
            </button>{" "}
            <button onClick={() => removeFromList(index)}> Delete </button>{" "}
          </li>
        );
      })}
    </div>
  );
}

export default HomePage;
