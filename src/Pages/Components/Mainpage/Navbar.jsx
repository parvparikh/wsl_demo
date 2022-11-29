import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//deals with checkbox for learning object selection and course selection dropdown
const Navbar = (props) => {
  const [selected, setSelected] = useState([]);
  const [course, setCourse] = useState("Network Science for Web");
  useEffect(() => {}, [selected, course]);
  const handleChange = (e) => {
    const { value, checked } = e.target;
    console.log(value, " is value and checked is", checked);
    if (checked) {
      //check
      setSelected([...selected, value]);
      props.handler([...selected, value]);
    } else {
      let s = selected.filter((v) => v !== value);
      setSelected(s);
      props.handler([...s]);
    }
  };
  return (
    <div>
      <ul className="flex flex-relative  mx-8 font-roboto font-extrabold text-xl py-2 gap-4">
        <label>
          Learners
          <input
            type="checkbox"
            name="option"
            value="learner"
            onChange={handleChange}
          ></input>
        </label>

        <label>
          Resources
          <input
            type="checkbox"
            name="option"
            value="resource"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Learner Contribution
          <input
            type="checkbox"
            name="option"
            value="learner_contribution"
            onChange={handleChange}
          ></input>
        </label>
      </ul>
      <select
        onChange={props.courseHandler}
        className="mx-8 font-roboto font-extrabold py-2 gap-4 bg-primary"
      >
        <option value="Network Science for Web">Network Science for Web</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>
    </div>
  );
};

export default Navbar;
