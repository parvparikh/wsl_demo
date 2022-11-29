//Polyline display HTML,CSS
import React from "react";
import Plot from "react-plotly.js";
import * as api from "../../../data/api.js";
const Polyline = (props) => {
  let css =
    props.hide === "true"
      ? "hidden grow mx-auto px-8 h-5/6 w-full"
      : "grow px-8";
  return (
    <div className={css}>
      <Plot
        data={[
          {
            x: props.data != null ? Array.from(api.topic_names.values()) : [],
            y: props.data != null ? Object.values(props.data.polyline) : [],
            type: "scatter",
            line: { shape: "hv" },
          },
        ]}
        style={{
          width: "100%",
          height: "100%",
        }}
        layout={{
          autosize: true,
          showlegend: false,
          paper_bgcolor: "D9D9D9",
          plot_bgcolor: "#FF65",
          orientation: "h",
          xaxis: { tickangle: "45", automargin: true },
          yaxis: {},
          margin: {},
        }}
        config={{ responsive: true }}
        useResizeHandler={true}
      ></Plot>
    </div>
  );
};

export default Polyline;
