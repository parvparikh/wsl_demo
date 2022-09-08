import React from "react";
import { useState } from "react";
import Heading from "./Components/Mainpage/Heading.jsx";
import Main from "./Components/Mainpage/Main.jsx";
import Sidebar from "./Components/Mainpage/Sidebar.jsx";
const Mainpage = () => {
  const [hide, setHide] = useState("true");
  const [data, setData] = useState(null);
  const handler = (x, y, resources) => {
    setHide("false");
    for (let i = 0; i < resources.length; i++) {
      console.log(resources[i]);
      if (resources[i]["ld"]["x"] === x && resources[i]["ld"]["y"])
        setData(resources[i]);
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
        <Sidebar hide={hide} data={data} back_handler={handler2} />
      </div>
    </>
  );
};

export default Mainpage;
