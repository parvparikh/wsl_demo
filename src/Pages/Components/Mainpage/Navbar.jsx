import React from "react";

const Navbar = (props) => {
  let default_css = "cursor-pointer";
  let learners_css = "underline decoration-orange decoration-4 cursor-pointer";
  return (
    <ul className="flex flex-relative items-center justify-center font-roboto font-extrabold text-xl py-2 gap-4">
      <li
        className={props.type === "learner" ? learners_css : default_css}
        onClick={() => props.handler("learner")}
      >
        Learners
      </li>
      <li
        className={props.type === "resource" ? learners_css : default_css}
        onClick={() => props.handler("resource")}
      >
        Resources
      </li>
    </ul>
  );
};

export default Navbar;
