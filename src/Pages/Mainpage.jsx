//Main page wrapper which holds all componenets
import React, { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getTop3 } from "../data/api.js";
import Heading from "./Components/Mainpage/Heading.jsx";
import Main from "./Components/Mainpage/Main.jsx";
import Navbar from "./Components/Mainpage/Navbar.jsx";
import Polyline from "./Components/Mainpage/Polyline.jsx";
import Sidebar from "./Components/Mainpage/Sidebar.jsx";
const Mainpage = () => {
  //State management for what kind of subject, data is queried.
  const [hide, setHide] = useState("true");
  const [data, setData] = useState(null);
  const [top3, setTop3] = useState(null);
  const [typeOfData, setTypeOfData] = useState([]);
  const [sideType, setSideType] = useState("");
  const [course, setCourse] = useState("Network Science for Web");
  //Navbar is handled in the following way
  const navHandler = (toSet) => {
    setHide("true");
    setTypeOfData(toSet);
  };
  //On clicking an user/resource the following snippet queries needed information from the sidebar
  const handler = (x, y, resources, type) => {
    setHide("false");
    for (let i = 0; i < resources.length; i++) {
      if (resources[i]["ld"][0] === x && resources[i]["ld"][1] === y) {
        setData(resources[i]);
        setTop3(getTop3(resources[i], course));
        setSideType(type);
      }
    }
  };
  //For back button in Sidebar
  const handler2 = () => {
    setHide("true");
  };
  //For the course selection dropdown
  const courseHandler = (e) => {
    setCourse(e.target.value);
    setHide("true");
  };
  useEffect(() => {}, [typeOfData, course]);
  //UI structure
  return (
    <>
      <Heading course={course} />
      <Navbar handler={navHandler} courseHandler={courseHandler} />
      <div className="flex w-full h-full  justify-between">
        
        <Main
          handler={handler}
          type={typeOfData}
          className=""
          top3={top3}
          course={course}
        />
        <div className="flex flex-col justify-center ">
          <Sidebar
            hide={hide}
            data={data}
            back_handler={handler2}
            top3={top3}
            type={sideType}
          />
        </div>
      </div>
      <div className="flex   justify-between">
        <Polyline data={data} hide={hide} type={sideType} />
      </div>
    </>
  );
};

export default Mainpage;
