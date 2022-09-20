import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
import { useState } from "react";
const Main = (props) => {
  useEffect(() => {
    async function initialise() {
      await api.loadResourceData();
    }
    // Execute the created function directly
    initialise();
  }, []);
  return (
    <div className="flex relative items-center justify-center w-full ">
      <Plot
        data={[
          {
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
          props.handler(data.points[0].x, data.points[0].y, api.resources);
        }}
      />
    </div>
  );
};
export default Main;
