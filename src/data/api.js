// Backend logic/ Business logic needed by UI elements 
import * as NSWlearnerdata from "./parsed_learner.json"
import * as NSWresourceData from "./resource.json"
import * as resourceNameNSW from "./LearningObjects1_nsw.json"
import * as MLlearnerdata from "./learners1.json"
import * as MLresourceData from "./resources1.json"
import * as resourceNameML from "./LearningObjects1_ml.json"
import * as learnerContributionNSW from './learner_contribution.json'
import * as NSWpathway from './nsw/nsw_pathway.json'
import { Collapse } from "react-bootstrap"

// import * as resourceNameML from "./topic1.json"
// import * as resourceNameML from "./topic1.json"
let data = [];
//selecting a subject from the list 
const selectSubject = {
  //dictionary of form "Name of Course": [learnerData,resourceData,resourceNameMapping]
  "Network Science for Web" : [NSWlearnerdata,NSWresourceData,resourceNameNSW,learnerContributionNSW,NSWpathway],
  "Machine Learning" : [MLlearnerdata,MLresourceData,resourceNameML], 
  "Web and Mind":[],

};
//Containers needed for the storing data course-wise : 

export let resources = []
export let resource_id = []
export let learners_object = []; 
export let resource_x = [] 
export let resource_y = []
export let resources_polyline = []
export let resources_name = []
export let resources_type = []
export let resources_volume = []
export let resources_description = []
export let resource_icon = []

export let lc = []
export let lc_object = []; 
export let lc_x = [] 
export let lc_y = []
export let lc_polyline = []
export let lc_name = []
export let lc_type = []
export let lc_volume = []
export let lc_description = []
export let lc_icon = []

export let learner_contribution = []
export let learners= []
export let learner_x = []
export let learner_y = []
export let learners_polyline = []
export let learners_name = []
export let learners_file_name = []
export let learners_id = []
export let topic_names = new Map();
export let learner_icon = [] ; 

export let topic_icon = []
export let topic_x = []
export let topic_y = []

export let resource_pathway = [] 
export let rpath = []

export const cleanList = ()=>{
resources = []
 learners_object = []; 
 resource_x = [] 
 resource_y = []
 resource_id = []
 resources_polyline = []
 resources_name = []
 resources_type = []
 resources_volume = []
 resources_description = []
 resource_icon = []

 learner_contribution = []
 learners= []
 learner_x = []
 learner_y = []
 learners_polyline = []
 learners_name = []
 learners_file_name = []
 learners_id = []
 topic_names = new Map();
 learner_icon = [] ; 
  
 topic_icon = [] ;
 topic_x = [] ;
 topic_y = [] ;

 resource_pathway = [] ;
 rpath = [];
}
//Loads resource data from json and parse it into usuable UI objects 
export const loadResourceData = async (subject)=>{
  //  console.log("R",subject)
  loadTopicNames(subject)
  let file = selectSubject[subject][1];
   data = JSON.stringify(file)
   let t = JSON.parse(data)   
   resources = Object.values(t)
   loadTopicNames(subject,1)
    
   let file1 = selectSubject[subject][4];
   data = JSON.stringify(file1)
   t = JSON.parse(data)   
   resource_pathway = Object.values(t)
   let i=0
    while(t[i])
    {
      rpath.push(t[i]["pathway"])
      i++
    }
   
   //console.log("rr",t[0]["pathway"][0])

  resources.forEach(resource => {
    resource_icon.push("📄")
    resource_id.push(resource["id"])
    resource_x.push(resource["ld"]["x"])
    resource_y.push(resource["ld"]["y"])
    resources_polyline.push({ [resource["name"]]: resource["polyline"]})
    resources_name.push(resource["name"])
    resources_type.push([ resource["type"]])
    resources_volume.push([ resource["resource_volume"] ])
    resources_description.push({[resource["name"]] : resource["resource_summary"]})
    
   })
   
   
  // file = selectSubject[subject][4];
  // data = JSON.stringify(file)
  // t = JSON.parse(data)   
  // resource_pathway = Object.values(t)
  // resource_pathway.forEach(pathway => {
  //   rpath.push(pathway["pathway"])

  //     });
   
  
}
//Loads learner_contribution data from json and parse it into usuable UI objects 
export const loadLearnerContribution= async (subject)=>{
  
  loadTopicNames(subject)
  let file = selectSubject[subject][3];
   data = JSON.stringify(file)
   let t = JSON.parse(data)   
   lc = Object.values(t)
   loadTopicNames(subject,1)
  lc.forEach(resource => {
    lc_icon.push("💬")
    lc_x.push(resource["ld"]["x"])
    lc_y.push(resource["ld"]["y"])
    lc_polyline.push({ [resource["name"]]: resource["polyline"]})
    lc_name.push(resource["name"])
    lc_type.push([ resource["type"]])
    lc_volume.push([ resource["resource_volume"] ])
    lc_description.push({[resource["name"]] : resource["resource_summary"]})
   });
   
  
}
export const loadTopics = (subject)=>{
  //console.log(subject)
  let file = selectSubject[subject][2];
  
   data = JSON.stringify(file)
   let t = JSON.parse(data)   
    learners_object= Object.values(t)
    learners_object.forEach(rname=>{
      topic_icon.push("🎯")
      topic_x.push(rname["ld"][0])
      topic_y.push(rname["ld"][1])
    })

}
//Topic Names for a course which act as a label for various plots. 
export const loadTopicNames = (subject) =>{
  //console.log(subject)
  let file = selectSubject[subject][2];
  
   data = JSON.stringify(file)
   let t = JSON.parse(data)   
    learners_object= Object.values(t)
    learners_object.forEach(rname=>{
      topic_names.set(rname.topic_id,rname.name);
    
    })

    let topic_names2 = [...topic_names.entries()].sort(function(a,b){
      return a[0]-b[0];
    }); 
 
    topic_names = new Map(topic_names2);
}
export const getTop3 = (resource,subject) =>{
    loadTopicNames(subject)
    let temp = [];
    let t2 = [];
    for(const prop in resource.polyline){
        t2.push(resource.polyline[prop]);
    }
    let t3 = [...t2];
    t2.sort();
    t2.reverse(); 
  // need optimisation
  for (let i = 0; i < t2.length; i++) {
    if (t3[i] == t2[0]) {
      temp.push(i);
    }
  }
  for (let i = 0; i <t2.length; i++) {
    if (t3[i] == t2[1]) {
      temp.push(i);
    }
  }
  for (let i = 0; i < t2.length; i++) {
    if (t3[i] == t2[2]) {
      temp.push(i);
    }
  }
  
  // temp[0] = topic_names[temp[0]];
  // temp[1] = topic_names[temp[1]];
  // temp[2] = topic_names[temp[2]];
  //console.log(temp);
  // console.log(topic_names)
  let finalAns = [];
  finalAns.push(topic_names.get(temp[0].toString()));
  finalAns.push(topic_names.get(temp[1].toString()));
  finalAns.push(topic_names.get(temp[2].toString()));
  return finalAns; 
  

}
//Parse learner.json to obtain value for UI and fill the necessary containers 
export const loadLearnerData = async(subject)=>{
  loadTopicNames(subject)
  let file = selectSubject[subject][0];
  learners = Object.values(file);
  
  
 
    learners.forEach(learner => {
      learner_icon.push("👤");
      learner_x.push(learner["ld"]["x"])
      learner_y.push(learner["ld"]["y"])
      learners_polyline.push({ [learner["Learner Id"]]: learner["polyline"]})
      learners_file_name.push( learner["file name"])
      learners_id.push(learner["Learner Id"])
       });
       
     
}

export const loadPathwayData = async(subject)=>{
  
  // loadTopicNames(subject)
  // console.log("hi")
  // let file = selectSubject[subject][4];
  // data = JSON.stringify(file)
  // let t = JSON.parse(data)   
  // resource_pathway = Object.values(t)
  
  //   resource_pathway.forEach(pathway => {
  //     rpath.push(pathway["pathway"])

  //      });
       
    
  // let file1 = selectSubject[subject][4];
  // data = JSON.stringify(file1)
  // let t = JSON.parse(data)   
  // resource_pathway = Object.values(t)

  // rpath.push(t[0]["pathway"])
  // rpath.push(t[1]["pathway"])
  // rpath.push(t[2]["pathway"])
  // console.log("rr",t[0]["pathway"][0])
}

