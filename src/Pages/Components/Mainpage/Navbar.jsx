import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = (props) => {
  const [selected, setSelected] = useState([]);
  useEffect(() => {}, [selected]);
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
    </ul>
  );
};

export default Navbar;
