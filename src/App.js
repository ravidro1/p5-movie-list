import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import Default from "./Pages/Default";
import Detail from "./Pages/Detail";
import FullList from "./Pages/FullList";
import HomePage from "./Pages/HomePage";

const DATA = "data";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem(DATA));
    console.log(temp);
    setList(temp);
  }, []);

  useEffect(() => { 
      console.log("2");
    if(list.length) localStorage.setItem(DATA, JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<HomePage list={list} setList={setList} />}
        ></Route>
        {/* <Route path='/detail' element={s<Detail/>}> </Route> */}
        <Route
          path="/detail/:movieName"
          element={<Detail list={list} setList={setList} />}
        >
          {" "}
        </Route>
        <Route
          path="/fullList"
          element={<FullList list={list} setList={setList} />}
        >
          {" "}
        </Route>
        <Route path="*" element={<Default />}></Route>
      </Routes>
    </div>
  );
}

export default App;
