import * as NSWlearnerdata from "./parsed_learner.json"
import * as NSWresourceData from "./resource.json"
import * as resourceNameNSW from "./LearningObjects.json"
import * as MLlearnerdata from "./learners1.json"
import * as MLresourceData from "./resources1.json"
import * as resourceNameML from "./LearningObjects_ML.json"
// import * as resourceNameML from "./topic1.json"
let data = [];
const selectSubject = {
  //dictionary of form "Name of Course": [learnerData,resourceData,resourceNameMapping]
  "Network Science for Web" : [NSWlearnerdata,NSWresourceData,resourceNameNSW],
  "Machine Learning" : [MLlearnerdata,MLresourceData,resourceNameML], 
  "Web and Mind":[],

};
//NSW
export let resources = []
export let learners_object = []; 
export let resource_x = [] 
export let resource_y = []
export let resources_polyline = []
export let resources_name = []
export let resources_type = []
export let resources_volume = []
export let resources_description = []
export let resource_icon = []

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

export const cleanList = ()=>{
resources = []
 learners_object = []; 
 resource_x = [] 
 resource_y = []
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
  

}
export const loadResourceData = async (subject)=>{
  
  loadTopicNames(subject)
  let file = selectSubject[subject][1];
   data = JSON.stringify(file)
   let t = JSON.parse(data)   
   resources = Object.values(t)
   loadTopicNames(subject,1)
  resources.forEach(resource => {
    resource_icon.push("📄")
    resource_x.push(resource["ld"]["x"])
    resource_y.push(resource["ld"]["y"])
    resources_polyline.push({ [resource["name"]]: resource["polyline"]})
    resources_name.push(resource["name"])
    resources_type.push([ resource["type"]])
    resources_volume.push([ resource["resource_volume"] ])
    resources_description.push({[resource["name"]] : resource["resource_summary"]})
   });
   
  
}


export const loadTopicNames = (subject) =>{
  console.log(subject)
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
  console.log(temp);
  // console.log(topic_names)
  let finalAns = [];
  finalAns.push(topic_names.get(temp[0].toString()));
  finalAns.push(topic_names.get(temp[1].toString()));
  finalAns.push(topic_names.get(temp[2].toString()));
  return finalAns; 
  

}

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


export const learnerResourceMapping = (subject)=>{
    // console.log("learners length" , learners.length);
    // // for(let i = 0 ; i<learners.length; i++){
    // //     learner_contribution.push([]);
    // // }
    // learner_contribution = [];
    // for(let j = 0; j<resources.length; j++){
    //     if(resources[j]["type"] === "learner" && resources[j]["name"] === learners[subject]["file name"]){
    //         let r_id = (resources[j]["id"]);
    //         let r_name = resources[j]["name"];
    //         // for(let k = 0 ; k<learners_file_name.length;k++){
    //         //     if(learners_file_name[k]===r_name){
    //         //       console.log(r_name);
    //         //         learner_contribution.push(r_id);
    //         //     }
    //         // }
    //         learner_contribution.push(r_id);
    //     }

    // }
    // // let contri_learner = [{}]
    // // for(let i = 0 ; i<learner_contribution[subject].length;i++){
    // //     for(let j = 0 ; j<learner_contribution[subject][i].length;j++){
    // //         contri_learner[subject][learner_contribution[subject][j]] = learners_id[subject][i];
    // //     }
    // // }
}
const actualTerrainData = (subject) =>{


}



