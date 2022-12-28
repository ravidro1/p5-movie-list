import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";

function HomePage({list, setList}) {
  const {
    reset,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm();

  const [oneMovie, setOneMovie] = useState({});
  

  function onSubmit(data) {
    setOneMovie(data);
    setList([...list, data]);
    reset();
  }

  function removFromList(index){
    setList(list.filter((item, i) => i != index))
  }

  return (
    <div>
    
    <h1> List Length: { list.length } <NavLink to={"/fullList"}><button> To List </button> </NavLink> </h1>
      <h1> Home Page </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={"text"}
          placeholder="Title"
          {...register("title", {required: true})}
        />
        {errors.title && <p> you need to insert title </p>}

        <input
          type={"text"}
          placeholder="Director"
          {...register("director", {required: true})}
        />
        {errors.director && <p> you need to insert director </p>}

        <input
          type={"number"}
          placeholder="Year"
          {...register("year", {required: true})}
        />
        {errors.year && <p> you need to insert year </p>}

        <input type={"submit"} />
      </form>



        {list.map( (item, index) => {
            return <li key={index}> {item.title} <NavLink to={`/detail/${item.title}`} state={{item: item,id: index }}> <button> Detail </button> </NavLink> <button onClick={() => removFromList(index)}> Delete </button> </li> 
        } )}

    </div>
  );
}

export default HomePage;
