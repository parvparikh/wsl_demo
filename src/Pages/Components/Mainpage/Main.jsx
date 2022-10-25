import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Main = (props) => {
  let data = [];
  let a1 = [], a2 = [];

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
  let annots = [];
  let annots_learner = [
  {
    x: 0.367,
    y: 0.80,
    xref: 'x',
    yref: 'y',
    text: 'M20147',
    showarrow: false,              
  },
  {
    x: 0.0708,
    y: 0.5154,
    xref: 'x',
    yref: 'y',
    text: 'M20091',
    showarrow: false,              
  },
  {
    x: 0.5627,
    y: 0.341,
    xref: 'x',
    yref: 'y',
    text: 'M20088',
    showarrow: false,              
  },
  {
    x: 0.3188,
    y: 0.0976,
    xref: 'x',
    yref: 'y',
    text: 'M20089',
    showarrow: false,              
  },
  {
    x: 0.8589,
    y: 0.692,
    xref: 'x',
    yref: 'y',
    text: 'M20047',
    showarrow: false,              
  }];
  
  let annots_resource = [
  {
    x: 0.2567,
    y: 0.9380,
    xref: 'x',
    yref: 'y',
    text: 'Retweet Graph.pdf',
    showarrow: false,              
  },
  {
    x: 0.2978,
    y: 0.5644,
    xref: 'x',
    yref: 'y',
    text: 'SEN5.pdf',
    showarrow: false,              
  },
  {
    x: 0.5787,
    y: 0.8619,
    xref: 'x',
    yref: 'y',
    text: 'Markov Chain.pdf',
    showarrow: false,              
  },
  {
    x: 0.7706,
    y: 0.46599,
    xref: 'x',
    yref: 'y',
    text: 'SEN9.pdf',
    showarrow: false,              
  },
  {
    x: 0.9548,
    y: 0.1771,
    xref: 'x',
    yref: 'y',
    text: 'Epidemics',
    showarrow: false,              
  }]

  for (let i = 0; i < props.type.length; i++) {
    if (props.type[i] === "learner") {
      data.push(learner_plot);
      a1 = annots_learner;
    }
    if (props.type[i] === "resource") {
      data.push(resource_plot);
      a2 = annots_resource;
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
          annotations: a1.concat(a2)
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
