import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Main = (props) => {
  let data = [];
  let a1 = [],
    a2 = [];

  useEffect(() => {
    async function initialise() {
      // await api.loadLearnerData();
      // await api.loadResourceData();
      api.cleanList();
      Promise.all([
        api.loadLearnerData(props.course),
        api.loadResourceData(props.course),
        api.loadLearnerContribution(props.course),
      ]);
      api.learnerResourceMapping(props.course);
    }
    // Execute the created function directly
    initialise();
  }, [data]);
  // console.log(api.NSWlearner_contribution);
  // console.log("ML learner data", api.MLlearner_x);
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
    name: api.learners_id,
    hovertemplate: "Learner <extra></extra>",
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
    name: api.resources_name,
    hovertemplate: "Resource <extra></extra>",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  let learner_contribution_plot = {
    x: api.lc_x,
    y: api.lc_y,
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
    text: api.lc_icon,
    name: api.lc_name,
    hovertemplate: "Learner Contribution <extra></extra>",
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
  let annots = [];
  let annots_learner = [],
    annots_resource = [];
  for (let i = 0; i < 5; i++) {
    let pos = Math.floor(Math.random() * learner_plot.x.length);
    annots_learner.push({
      x: learner_plot.x[pos],
      y: learner_plot.y[pos],
      xref: "x",
      yref: "y",
      text: learner_plot.name[pos],
      showarrow: false,
    });

    pos = Math.floor(Math.random() * resource_plot.x.length);
    annots_resource.push({
      x: resource_plot.x[pos],
      y: resource_plot.y[pos],
      xref: "x",
      yref: "y",
      text: resource_plot.name[pos],
      showarrow: false,
    });
  }
  console.log(props.type);
  for (let i = 0; i < props.type.length; i++) {
    if (props.type[i] === "learner") {
      data.push(learner_plot);
      a1 = annots_learner;
    }
    if (props.type[i] === "resource") {
      data.push(resource_plot);
      a2 = annots_resource;
    }
    if (props.type[i] === "learner_contribution") {
      data.push(learner_contribution_plot);
      // a2 = annots_resource;
    }
  }
  // data.push(learner_contribution_plot);
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
          annotations: a1.concat(a2),
          shapes: [
            {
              type: "line",
              x0: 0,
              y0: 0,
              x1: Math.max(
                Math.max(...learner_plot.x),
                Math.max(...resource_plot.x)
              ),
              y1: Math.max(
                Math.max(...learner_plot.y),
                Math.max(...resource_plot.y)
              ),
              line: {
                color: "rgb(128, 0, 128)",
                width: 4,
                dash: "dot",
              },
            },
          ],
        }}
        useResizeHandler={true}
        config={{ responsive: true }}
        onClick={(data) => {
          console.log(data);
          let send_resource;
          let send_type;

          if (data.points[0].text === "👤") {
            send_resource = api.learners;
            send_type = "learner";
          }
          if (data.points[0].text === "📄") {
            send_resource = api.resources;
            send_type = "resource";
          }
          if (data.points[0].text === "💬") {
            send_resource = api.lc;
            send_type = "resource";
          }

          props.handler(
            data.points[0].x,
            data.points[0].y,
            send_resource,
            send_type
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
