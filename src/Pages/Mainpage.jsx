import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getTop3 } from "../data/api.js";
import Heading from "./Components/Mainpage/Heading.jsx";
import Main from "./Components/Mainpage/Main.jsx";
import Navbar from "./Components/Mainpage/Navbar.jsx";
import Sidebar from "./Components/Mainpage/Sidebar.jsx";
const Mainpage = () => {
  const [hide, setHide] = useState("true");
  const [data, setData] = useState(null);
  const [top3, setTop3] = useState(null);
  const [typeOfData, setTypeOfData] = useState("learner");
  const navHandler = (toSet) => {
    setHide("true");
    setTypeOfData(toSet);
    console.log(toSet);
  };
  const handler = (x, y, resources) => {
    setHide("false");
    for (let i = 0; i < resources.length; i++) {
      if (resources[i]["ld"]["x"] === x && resources[i]["ld"]["y"] === y) {
        setData(resources[i]);
        setTop3(getTop3(resources[i]));
      }
    }
  };
  const handler2 = () => {
    setHide("true");
  };
  useEffect(() => {}, [typeOfData]);
  return (
    <>
      <Navbar type={typeOfData} handler={navHandler} />
      <Heading type={typeOfData} />

      <div className="flex">
        <Main handler={handler} type={typeOfData} />
        <Sidebar
          hide={hide}
          data={data}
          back_handler={handler2}
          top3={top3}
          type={typeOfData}
        />
      </div>
    </>
  );
};

export default Mainpage;
