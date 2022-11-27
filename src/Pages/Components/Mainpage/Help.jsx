import React from "react";
import description from "./mapdescription.png";
const Help = () => {
  return (
    <>
      <div className="flex marker:justify-center">
        <h2 className="font-roboto text-2xl font-extrabold ">
          Navigated Learning Map
        </h2>
      </div>

      <div>
        <img src={description}></img>
      </div>
    </>
  );
};

export default Help;
