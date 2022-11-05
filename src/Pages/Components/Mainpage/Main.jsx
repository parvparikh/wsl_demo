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
      Promise.all([api.NSWloadLearnerData(), api.NSWloadResourceData(), api.MLloadLearnerData(), api.MLloadResourceData()]);
      api.learnerResourceMapping(0);
    }
    // Execute the created function directly
    initialise();
  }, [data]);
  // console.log(api.NSWlearner_contribution);
  // console.log("ML learner data", api.MLlearner_x);
  let NSWlearner_plot = {
    x: api.NSWlearner_x,
    y: api.NSWlearner_y,
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
    text: api.NSWlearner_icon,
    name: api.NSWlearners_id,
    hovertemplate: "Learner",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  let NSWresource_plot = {
    x: api.NSWresource_x,
    y: api.NSWresource_y,
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
    text: api.NSWresource_icon,
    name: api.NSWresources_name,
    hovertemplate: "Resource",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  let MLlearner_plot = {
    x: api.MLlearner_x,
    y: api.MLlearner_y,
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
    text: api.MLlearner_icon,
    name: api.MLlearners_id,
    hovertemplate: "Learner",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  let MLresource_plot = {
    x: api.MLresource_x,
    y: api.MLresource_y,
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
    text: api.MLresource_icon,
    name: api.MLresources_name,
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
  let annots_learner = [], annots_resource = [];
  for(let i=0;i<5;i++)
  {
    if(props.course === "Network Science for Web")
    {
      let pos = Math.floor(Math.random()*NSWlearner_plot.x.length); 
      annots_learner.push({
        x: NSWlearner_plot.x[pos],
        y: NSWlearner_plot.y[pos],
        xref: 'x',
        yref: 'y',
        text: NSWlearner_plot.name[pos],
        showarrow: false,
      });
      
      pos = Math.floor(Math.random()*NSWresource_plot.x.length);
      annots_resource.push({
        x: NSWresource_plot.x[pos],
        y: NSWresource_plot.y[pos],
        xref: 'x',
        yref: 'y',
        text: NSWresource_plot.name[pos],
        showarrow: false,
      });
    }
    else if(props.course === "Machine Learning")
    {
      let pos = Math.floor(Math.random()*MLlearner_plot.x.length);
      annots_learner.push({
        x: MLlearner_plot.x[pos],
        y: MLlearner_plot.y[pos],
        xref: 'x',
        yref: 'y',
        text: MLlearner_plot.name[pos],
        showarrow: false,
      });

      pos = Math.floor(Math.random()*MLresource_plot.x.length);
      annots_resource.push({
        x: MLresource_plot.x[pos],
        y: MLresource_plot.y[pos],
        xref: 'x',
        yref: 'y',
        text: MLresource_plot.name[pos],
        showarrow: false,
      });
    }
  }
  // annots_learner = [
  // {
  //   x: 0.367,
  //   y: 0.80,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'M20147',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.0708,
  //   y: 0.5154,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'M20091',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.5627,
  //   y: 0.341,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'M20088',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.3188,
  //   y: 0.0976,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'M20089',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.8589,
  //   y: 0.692,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'M20047',
  //   showarrow: false,              
  // }];
  
  // annots_resource = [
  // {
  //   x: 0.2567,
  //   y: 0.9380,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'Retweet Graph.pdf',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.2978,
  //   y: 0.5644,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'SEN5.pdf',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.5787,
  //   y: 0.8619,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'Markov Chain.pdf',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.7706,
  //   y: 0.46599,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'SEN9.pdf',
  //   showarrow: false,              
  // },
  // {
  //   x: 0.9548,
  //   y: 0.1771,
  //   xref: 'x',
  //   yref: 'y',
  //   text: 'Epidemics',
  //   showarrow: false,              
  // }]

  for (let i = 0; i < props.type.length; i++) {
    if (props.type[i] === "learner") {
      if(props.course === "Network Science for Web")
      {
        data.push(NSWlearner_plot);
        a1 = annots_learner;
      }
      else if(props.course === "Machine Learning")
      {
        data.push(MLlearner_plot);
        a1 = annots_learner;
      }
    }
    if (props.type[i] === "resource") {
      if(props.course === "Network Science for Web")
      {
        data.push(NSWresource_plot);
        a2 = annots_resource;
      }
      else if(props.course === "Machine Learning")
      {
        data.push(MLresource_plot);
        a2 = annots_resource;
      }
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
            data.points[0].text == "👤" ? api.NSWlearners : api.NSWresources,
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
