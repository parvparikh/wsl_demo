import React from "react";

const Heading = (props) => {
  return (
    <div className="flex flex-relative items-center justify-center font-roboto font-extrabold text-2xl ">
      {props.type === "learner" ? "Learner's" : "Resource"} Map for Network
      Science of Web
    </div>
  );
};

export default Heading;
