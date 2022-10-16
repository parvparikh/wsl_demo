import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Main = (props) => {
  let data = [];

  useEffect(() => {
    async function initialise() {
      // await api.loadLearnerData();
      // await api.loadResourceData();
      Promise.all([api.loadLearnerData(), api.loadResourceData()]);
    }
    // Execute the created function directly
    initialise();
  }, [data]);

  let learner_plot = {
    x: api.learner_x,
    y: api.learner_y,
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
    text: api.learner_icon,
    hovertemplate: "Learner",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  let resource_plot = {
    x: api.resource_x,
    y: api.resource_y,
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
    text: api.resource_icon,
    hovertemplate: "Resource",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  for (let i = 0; i < props.type.length; i++) {
    if (props.type[i] === "learner") {
      data.push(learner_plot);
    }
    if (props.type[i] === "resource") {
      data.push(resource_plot);
    }
  }
  return (
    <div className="grow">
      <Plot
        data={data}
        layout={{
          autosize: true,
          showlegend: false,
          paper_bgcolor: "D9D9D9",
          plot_bgcolor: "#FF65",
          orientation: "h",
        }}
        useResizeHandler={true}
        config={{ responsive: true }}
        onClick={(data) => {
          console.log(data);
          props.handler(
            data.points[0].x,
            data.points[0].y,
            data.points[0].text == "👤" ? api.learners : api.resources,
            data.points[0].text == "👤" ? "learner" : "resource"
          );
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
export default Main;
