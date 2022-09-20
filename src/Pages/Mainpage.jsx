import React from "react";
import { useState } from "react";
import { getTop3 } from "../data/api.js";
import Heading from "./Components/Mainpage/Heading.jsx";
import Main from "./Components/Mainpage/Main.jsx";
import Sidebar from "./Components/Mainpage/Sidebar.jsx";
const Mainpage = () => {
  const [hide, setHide] = useState("true");
  const [data, setData] = useState(null);
  const [top3, setTop3] = useState(null);
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
  return (
    <>
      <Heading />
      <div className="flex">
        <Main handler={handler} />
        <Sidebar hide={hide} data={data} back_handler={handler2} top3={top3} />
      </div>
    </>
  );
};

export default Mainpage;
