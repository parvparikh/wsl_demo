import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Main = (props) => {
  let data = [
    {
      type: "scatter",
      mode: "line",
      name: "dot",
      line: {
        dash: "dot",
        width: 4,
      },
      markerSize: 15,
      x: [0, 0.5185185185185185],
      y: [0, 1],
      text: ["Name: Models of the Web"],
    },
    {
      type: "scatter",
      mode: "line",
      name: "dot",
      line: {
        dash: "dot",
        width: 4,
      },
      markerSize: 15,
      x: [0, 1],
      y: [0, 0.7407407407407407],
      text: ["Name: Confirmatory Analytics"],
    },
    {
      type: "scatter",
      mode: "line",
      name: "dot",
      line: {
        dash: "dot",
        width: 4,
      },
      markerSize: 15,
      x: [0, 0.8148148148148148],
      y: [0, 1],
      text: ["Name: Information diffusion models"],
    },
    {
      type: "scatter",
      mode: "line",
      name: "dot",
      line: {
        dash: "dot",
        width: 4,
      },
      markerSize: 15,
      x: [0, 1],
      y: [0, 0.5185185185185185],
      text: ["Name: Estimating centrality measures for very large graphs"],
    },
    {
      type: "scatter",
      mode: "line",
      name: "dot",
      line: {
        dash: "dot",
        width: 4,
      },
      markerSize: 15,
      x: [0, 0.37037037037037035],
      y: [0, 1],
      text: ["Name: Introduction to Network Science for the Web"],
    },
  ];

  useEffect(() => {
    async function initialise() {
      // await api.loadLearnerData();
      // await api.loadResourceData();
      Promise.all([api.loadLearnerData(), api.loadResourceData()]);
      api.learnerResourceMapping(0);
    }
    // Execute the created function directly
    initialise();
  }, [data]);
  console.log(api.learner_contribution);
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
  let start_point = {
    x: [0],
    y: [0],
    type: "scatter",
    mode: "markers+text",
    marker: {
      color: "green",
      size: 20,
      line: {
        color: "white",
        width: 2,
      },
      symbol: "square-dot",
    },
    text: ["START"],
    textposition: "bottom",
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
  data.push(start_point);
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
