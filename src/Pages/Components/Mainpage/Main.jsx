import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Main = (props) => {
  const [x, setX] = useState(
    props.type === "learner" ? api.learner_x : api.resource_x
  );
  const [y, setY] = useState(
    props.type === "learner" ? api.learner_y : api.resource_y
  );
  const [icon, setIcon] = useState(
    props.type === "learner" ? api.learner_icon : api.resource_icon
  );
  const [object, setObject] = useState();
  useEffect(() => {
    async function initialise() {
      if (props.type === "learner") {
        await api.loadLearnerData();
      } else {
        await api.loadResourceData();
      }
    }
    // Execute the created function directly
    initialise();
  }, []);
  return (
    <div className="flex relative items-center justify-center w-full ">
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: "scatter",
            mode: "text",
            marker: {
              color: "green",
              size: 12,
              line: {
                color: "white",
                width: 2,
              },
              symbol: "square-dot",
            },
            text: icon,
            hovertemplate: "Resource",
            textposition: "center",
            textfont: {
              size: 18,
            },
          },
        ]}
        layout={{
          width: 1200,
          height: 700,
          showlegend: false,
          paper_bgcolor: "D9D9D9",
          plot_bgcolor: "#FF65",
          orientation: "h",
        }}
        config={{ responsive: true }}
        onClick={(data) => {
          props.handler(
            data.points[0].x,
            data.points[0].y,
            props.type === "learner" ? api.learners : api.resources
          );
        }}
      />
    </div>
  );
};
export default Main;
