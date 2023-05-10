import React, { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import { kmeans } from 'ml-kmeans';
import * as api from "../../../data/api.js";
import { max } from "mathjs";

const Main = (props) => {
  let data = [];
  let a1 = [],
    a2 = [],
    a3 = [];
  let lc_plot = [];
  let filename = [],
    path = [],
    x = [],
    y = [],
    text = [],
    name = [];
  let path_pnt = [];
  let path_x1 = [];
  let path_y1 = [];
  let path_x2 = [];
  let path_y2 = [];
  const [learner_x, setLearner_x] = useState(null);
  const [learner_y, setLearner_y] = useState(null);

  useEffect(() => {
    async function initialise() {
      // await api.loadLearnerData();
      // await api.loadResourceData();
      api.cleanList();
      Promise.all([
        api.loadLearnerData(props.course),
        api.loadResourceData(props.course),
        api.loadLearnerContribution(props.course),
        api.loadTopics(props.course),
        //api.loadPathwayData(props.course),
        
      ]);
      // api.learnerResourceMapping(props.course);
      
    }
    // Execute the created function directly
    initialise();
  }, [data, props.course]);
  //console.log(api.resources_polyline)
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
    pathway: api.resource_pathway,
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
  let annots_learner = [],
    annots_resource = [],
    annots_topic =[];

  let topic_plot = {
    x: api.topic_x,
    y: api.topic_y,
    type: "scatter",
    mode: "text",
    text: api.topic_icon,
    name: api.topic_names,
    textfont: {
      size: 25,
    },
  };
//   //console.log("hi",api.topic_names.get('0'))
  const cluster_array_x = [];
  const cluster_array_y = [];
  const cluster_array_polyline = [];
  const cluster_array_id = [];
  const k = 4;
  const cntrs = [];
  if(api.resource_x.length)
  {
  const resource_xy = [];

  for (let i = 0; i < api.resource_x.length; i++) {
    resource_xy.push([api.resource_x[i], api.resource_y[i]]);
  }
  
  const { clusters, centroids } = kmeans(resource_xy,k);

  
  for(let j=0;j<k;j++)
  {
    const tempx = [];
    const tempid = [];
    const tempy = [];
    const tempoly = [];
    for (let i = 0; i < api.resource_x.length; i++) {
      if(clusters[i] === j)
      {
        tempx.push(api.resource_x[i]);
        tempy.push(api.resource_y[i]);
        tempid.push(api.resource_id[i]);
        const vals = api.resources_polyline[i]["name"];
        const ids = Object.keys(vals);
        let max = 0;
        //console.log("hi")
        for(let ite=0;ite<ids.length;ite++)
        {
          //console.log(vals[ite],vals[max])
          if(vals[ite]>vals[max])
          {
            max=ite;
          }
        }
        tempoly.push(max);
        // vals.forEach(elems => {
        //   if(elems. )
        // })
        //console.log("poly line :",j,i,max,vals[max],vals); 
        //tempoli.push(api.resources_polyline)
      }
    }
    cluster_array_x.push(tempx);
    cluster_array_y.push(tempy);
    cluster_array_id.push(tempid);
    cluster_array_polyline.push(tempoly);
  }


  //console.log("cax ",cluster_array_x);
  //console.log("cay ",cluster_array_y);
  console.log("cluster array of max topic from polyline ",cluster_array_polyline);
  
  
  for(let i=0;i<2;i++)
  {
    const temp=[];
    for(let j=0;j<k;j++)
    {
    temp.push(centroids[j][i]);
    }
    cntrs.push(temp);
  }

  console.log("clusters: ",cluster_array_id);
  }
//clusters
  const cluster_plot = [];
  const colors = ["green","orange","blue","red","purple","pink","yellow"];
for(let i=0;i<k;i++)
{
  cluster_plot[i] = {
    x: cluster_array_x[i],
    y: cluster_array_y[i],
    type: "scatter",
    mode: "markers",
    marker: {
      symbol: 20,
      size: 15,
      color: colors[i]
    },
  }
}

const centerplot = {
    x: cntrs[0],
    y: cntrs[1],
    type: "scatter",
    mode: "markers",
    marker: {
      symbol: 20,
      size: 15,
      color: "Black",
      //shape: "circle"
    },
  }



  for(let i=0;i<api.topic_names.size-1;i++)
  {
      annots_topic.push({
        x: api.topic_x[i],
        y: api.topic_y[i]-0.02,
        text: api.topic_names.get(i.toString()),
        font: { size: 16, color: 'black' },
        //bgcolor: "green",
        showarrow: false,
      })
}

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

  //console.log("topics",api.topic_names)
  // Random annotations for represenatational purpose 
  let annots = [];
  
    

    
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

  for(let i=0;i<api.rpath.length;i++)
  {
    path_pnt[i] = api.rpath[i]
  }
  
//pathways
  let path_id = [] 
  let resource_pathplot = []
  for(let q=0;q<api.rpath.length;q++)
  {
    path_x1 = []
      path_y1 = []
      path_id = []
    if(path_pnt[q])
    {
      let k=0 
      let p=0
    
    while(path_pnt[q][k])
    {
      //console.log("path ",path_pnt[p][k])
      for(let j=0;j<api.resource_id.length-1;j++)
      {
        
        if(api.resource_id[j] === path_pnt[q][k])
        {
            path_id.push(api.resource_id[j])
            path_x1.push(api.resource_x[j])
            path_y1.push(api.resource_y[j])
            ++k;        
        }
        
      }
    }
    //path_x1.push(path_x1[0])
    //path_y1.push(path_y1[0])
    //console.log(path_x1)
    //console.log(path_y1)
    
    // for(p=0;p<path_x1.length-1;p++)
    // {
    resource_pathplot[q] = {
        x: path_x1,
        y: path_y1,
        type: "scatter",
        //fill: 'tonexty',
        mode: "lines+markers",
        line: {
          shape: "spline",
          smoothing: 1.3,
          width: 3,  
        },
        marker: {
          symbol: 20,
          size: 15,
          angleref: 'previous'
        },
      }
      //data.push(resource_pathplot)
    
      
      
      // annots_rpaths.push({
      //   x: path_x1[p],
      //   y: path_y1[p],
      //   text: p+1,
      //   font: { size: 16, color: 'black' },
      //   bgcolor: "green",
      //   showarrow: false,
      // });
    //}
    // annots_rpaths.push({
    //   x: path_x1[p],
    //   y: path_y1[p],
    //   text: p+1,
    //   font: { size: 16, color: 'black' },
    //   bgcolor: "green",
    //   showarrow: false,
    // });
    }
  }
  
  //Terrain plot
  // console.log("Tname",api.Tname)
  // console.log("Tx",api.Tx)
  // console.log("Ty",api.Ty)
  
  //console.log("Tname",api.Tname)
  //console.log("Tx",api.Tx)
  //console.log("Ty",api.Ty)
  //this is for regualr
  let terrain_plot = []
  for(let i=0;i<api.Tname.length;i++)
  {
    api.Tx[i].shift()
    api.Tx[i].pop()
    api.Ty[i].shift()
    api.Ty[i].pop()
    terrain_plot[i] = {
      x: api.Tx[i],
      y: api.Ty[i],
      type: "scatter",
      //fill: 'tozeroy',
      //tozeroy tonexty
      mode: "markers"
      // line: {
      //   shape: "spline",
      //   smoothing: 1.3,
      //   width: 3,  
      // }
    }
    //data.push(terrain_plot)
  }


  // // below is the demo for areas
  // 
  // for(let i=0;i<api.Tname.length;i++)
  // {
  //   // api.Tx[i].shift()
  //   // api.Tx[i].pop()
  //   // api.Ty[i].shift()
  //   // api.Ty[i].pop()
  //   terrain_plot[i] = {
  //     x: api.Tx[i],
  //     y: api.Ty[i],
  //     type: "scatter",
  //     fill: 'tozeroy',
  //     //tozeroy tonexty
  //     mode: "lines",
  //     line: {
  //       shape: "spline",
  //       smoothing: 1.3,
  //       width: 3,  
  //     }
  //   }
  //   //data.push(terrain_plot)
  // }

  // Actually plotting what you see
  //console.log(props.type);
  for (let i = 0; i < props.type.length; i++) {
    if (props.type[i] === "learner") {
      data.push(learner_plot);
      a1 = annots_learner;
    }
    if (props.type[i] === "resource") {
      data.push(resource_plot);
      for(let i=0;i<k;i++)
      {
          data.push(cluster_plot[i]);
      }
      data.push(centerplot);
      
      a2 = annots_resource;
    }
    if (props.type[i] === "topic") {
      data.push(topic_plot);
      for(let k=0;k<api.Tname.length;k++)
      {
        data.push(terrain_plot[k])
      }
      a3 = annots_topic;
    }
    if (props.type[i] === "learner_contribution") {
      data.push(learner_contribution_plot);
       
    }
    //it works as wanted 
    if (props.type[i] === "pathway") {
      data.push(resource_plot);
      for(let k=0;k<resource_pathplot.length;k++)
      {
        data.push(resource_pathplot[k])
      }
      data.push(resource_pathplot);
      // a2 = annots_resource;
    }
  }



  
  // data.push(learner_contribution_plot);
  // following thing is mkaing the lines in the plot
  for (let i = 0; i < api.learner_x.length; i++) {
    if (api.learner_x[i] === learner_x && api.learner_y[i] === learner_y) {
      filename.push(api.learners_file_name[i]);
    }
  }
  for (let i = 0; i < api.lc_name.length; i++) {
    for (let j = 0; j < filename.length; j++) {
      if (api.lc_name[i] === filename[j]) {
        x.push(api.lc_x[i]);
        y.push(api.lc_y[i]);
        text.push(api.lc_icon[i]);
        name.push(api.lc_name[i]);
      }
    }
  }



  lc_plot = {
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
    text: text,
    name: name,
    hovertemplate: "Learner Contribution<extra></extra>",
    textposition: "center",
    textfont: {
      size: 18,
    },
  };
  data.push(lc_plot);

  //Drawing the line between the l and lc
  if (learner_x != null) {
    var line = {
      x: [learner_x, x[0]],
      y: [learner_y, y[0]],
      mode: "lines",
      line: {
        dash: "dot",
        width: 3,
        color: "green"
      },
     
    };
    data.push(line);
  }

  // for (let i = 0; i < api.resource_pathway.length; i++) {
  //   console.log("HI here",api.resource_pathway[i]);
  //   if (api.resource_pathway[i]) {
  //     console.log("HI here",api.resource_pathway[i]);
  //    // path.push(api.learners_file_name[i]);
  //   }
  // }
  


  //THIS WORKS HERE (RPATH DATA ACCESSED)
  
  // WORKABLE EXMAPLE WORK LITTLE MORE
  // for(let i=0;i<path_pnt.length;i++)
  // {
  //   let j=0 
  //   while(path_pnt[i][j])
  //   {
      
  //     j++
  //   }

  //   // let k=0
  //   // for(let j=0;j<api.resource_id.length-1;j++)
  //   // {
      
  //   //   if(api.resource_id[j] === path_pnt[0][k])
  //   //   {
  //   //       path_id.push(api.resource_id[j])
  //   //       path_x1.push(api.resource_x[j])
  //   //       path_y1.push(api.resource_y[j])
  //   //       ++k;        
  //   //   }
      
  //   // }
  // }
  

  //console.log("pnt",[path_pnt,path_id,path_x1,path_y1])
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
          annotations: (a1.concat(a2)).concat(a3),
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
                //shape: "spline",
              },
            },
          ],
        }}
        useResizeHandler={true}
        config={{ responsive: true }}
        onClick={(data) => {
          //console.log(data);
          let send_resource;
          let send_type;
          
          if (data.points[0].text === "👤") {
            send_resource = api.learners;
            send_type = "learner";
            setLearner_x(data.points[0].x);
            setLearner_y(data.points[0].y);
            // learner_handler(data.points[0].x, data.points[0].y)
          }
          if (data.points[0].text === "📄") {
            send_resource = api.resources;
            send_type = "resource";
            setLearner_x(null);
            setLearner_y(null);
          }
          if (data.points[0].text === "💬") {
            send_resource = api.lc;
            send_type = "resource";
            setLearner_x(null);
            setLearner_y(null);
          }
          if (data.points[0].text === "🎯") {
            send_resource = api.learners_object;
            send_type = "topic";
            // setLearner_x(null);
            // setLearner_y(null);
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
