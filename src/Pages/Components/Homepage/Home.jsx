import React from "react";
import { useState } from "react";
const Home = () => {
  const [course, setCourse] = useState("");
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="heading flex-col mx-auto ">
        <div className="">
          <h1 className="text-6xl font-roboto mb-5 font-extrabold">
            {" "}
            Navigated Learning
          </h1>
        </div>
        <div className="dropdown flex">
          <form className="mx-auto font-bold">
            <label>Select Course:</label>
            <select
              className="mx-2 bg-green font-bold mb-4 text-white px-2 rounded-xl"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="Course 1">Course 1 </option>
              <option value="Course 2">Course 2 </option>
            </select>
          </form>
        </div>
        <button
          className="mx-auto bg-orange  flex justify-center rounded-3xl py-4 px-4 text-white"
          onClick={() => {}}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
