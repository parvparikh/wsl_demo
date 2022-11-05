import React, {useState} from "react";

const Heading = (props) => {
  return (
    <div className="flex flex-relative items-center justify-center font-roboto font-extrabold text-2xl ">
      {`Discourse Map for ${props.course}`} 
    </div>
  );
};

export default Heading;
