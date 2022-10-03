import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Main = (props) => {
  let x = props.type === "learner" ? api.learner_x : api.resource_x;
  let y = props.type === "learner" ? api.learner_y : api.resource_y;
  let icon = props.type === "learner" ? api.learner_icon : api.resource_icon;
  useEffect(() => {
    async function initialise() {
      if (props.type === "learner") {
        await api.loadLearnerData();
      } else if (props.type === "resource") {
        await api.loadResourceData();
      }
    }
    // Execute the created function directly
    initialise();
  }, [props.type, x, y, icon]);
  return (
    <div className="grow">
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
          autosize: true,
          showlegend: false,
          paper_bgcolor: "D9D9D9",
          plot_bgcolor: "#FF65",
          orientation: "h",
        }}
        useResizeHandler={true}
        config={{ responsive: true }}
        onClick={(data) => {
          props.handler(
            data.points[0].x,
            data.points[0].y,
            props.type === "learner" ? api.learners : api.resources
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
