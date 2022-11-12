import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getTop3 } from "../data/api.js";
import Heading from "./Components/Mainpage/Heading.jsx";
import Main from "./Components/Mainpage/Main.jsx";
import Navbar from "./Components/Mainpage/Navbar.jsx";
import Polyline from "./Components/Mainpage/Polyline.jsx";
import Sidebar from "./Components/Mainpage/Sidebar.jsx";
const Mainpage = () => {
  const [hide, setHide] = useState("true");
  const [data, setData] = useState(null);
  const [top3, setTop3] = useState(null);
  const [typeOfData, setTypeOfData] = useState([]);
  const [sideType, setSideType] = useState("");
  const [course, setCourse] = useState("Network Science for Web");
  const navHandler = (toSet) => {
    setHide("true");
    setTypeOfData(toSet);
    console.log(toSet);
  };
  const handler = (x, y, resources, type) => {
    setHide("false");
    for (let i = 0; i < resources.length; i++) {
      if (resources[i]["ld"]["x"] === x && resources[i]["ld"]["y"] === y) {
        setData(resources[i]);
        setTop3(getTop3(resources[i], course));
        setSideType(type);
        console.log(data);
      }
    }
  };
  const handler2 = () => {
    setHide("true");
  };
  const courseHandler = (e) => {
    setCourse(e.target.value);
  };
  useEffect(() => {}, [typeOfData]);
  return (
    <>
      <Heading course={course} />
      <Navbar handler={navHandler} courseHandler={courseHandler} />
      <div className="flex w-full h-full  justify-between">
        <Main
          handler={handler}
          type={typeOfData}
          className=""
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
