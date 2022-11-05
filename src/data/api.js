import * as NSWlearnerdata from "./parsed_learner.json"
import * as NSWresourceData from "./resource.json"
import * as resourceName from "./LearningObjects.json"
import * as MLlearnerdata from "./learners1.json"
import * as MLresourceData from "./resources1.json"
//hardcoded need to change 
// const subject = 0 
//add export later

let data = [];

//NSW
export let NSWresources = []
export let NSWlearners_object = []; 
export const NSWresource_x = []
export const NSWresource_y = []
export const NSWresources_polyline = []
export const NSWresources_name = []
export const NSWresources_type = []
export const NSWresources_volume = []
export const NSWresources_description = []
export const NSWresource_icon = []

export const NSWlearner_contribution = []
export let NSWlearners= []
export const NSWlearner_x = []
export const NSWlearner_y = []
export const NSWlearners_polyline = []
export const NSWlearners_name = []
export const NSWlearners_file_name = []
export const NSWlearners_id = []
export let topic_names = new Map();
export const NSWlearner_icon = [] ; 

//ML
export let MLresources = []
export let MLlearners_object = []; 
export const MLresource_x = []
export const MLresource_y = []
export const MLresources_polyline = []
export const MLresources_name = []
export const MLresources_type = []
export const MLresources_volume = []
export const MLresources_description = []
export const MLresource_icon = []

export const MLlearner_contribution = []
export let MLlearners= []
export const MLlearner_x = []
export const MLlearner_y = []
export const MLlearners_polyline = []
export const MLlearners_name = []
export const MLlearners_file_name = []
export const MLlearners_id = []
export const MLlearner_icon = [] ;

export const NSWloadResourceData = async (filename,subject)=>{
  loadTopicNames('LearneringObjects.json',1)
 
   data = JSON.stringify(NSWresourceData)
   let t = JSON.parse(data)   
   NSWresources = Object.values(t)
   loadTopicNames('LearneringObjects.json',1)
  NSWresources.forEach(resource => {
    NSWresource_icon.push("📄")
    NSWresource_x.push(resource["ld"]["x"])
    NSWresource_y.push(resource["ld"]["y"])
    NSWresources_polyline.push({ [resource["name"]]: resource["polyline"]})
    NSWresources_name.push(resource["name"])
    NSWresources_type.push([ resource["type"]])
    NSWresources_volume.push([ resource["resource_volume"] ])
    NSWresources_description.push({[resource["name"]] : resource["resource_summary"]})
   });
   
  
}

export const MLloadResourceData = async (filename,subject)=>{
  loadTopicNames('LearneringObjects.json',1)
 
   data = JSON.stringify(MLresourceData)
   let t = JSON.parse(data)   
   MLresources = Object.values(t)
   loadTopicNames('LearneringObjects.json',1)
  MLresources.forEach(resource => {
    MLresource_icon.push("📄")
    MLresource_x.push(resource["ld"]["x"])
    MLresource_y.push(resource["ld"]["y"])
    MLresources_polyline.push({ [resource["name"]]: resource["polyline"]})
    MLresources_name.push(resource["name"])
    MLresources_type.push([ resource["type"]])
    MLresources_volume.push([ resource["resource_volume"] ])
    MLresources_description.push({[resource["name"]] : resource["resource_summary"]})
   });
   
  
}

export const loadTopicNames = (filename,subject) =>{
   data = JSON.stringify(resourceName)
   let t = JSON.parse(data)   
    NSWlearners_object= Object.values(t)
    NSWlearners_object.forEach(rname=>{
      topic_names.set(rname.topic_id,rname.name);
    })

    let topic_names2 = [...topic_names.entries()].sort(function(a,b){
      return a[0]-b[0];
    }); 
 
    topic_names = new Map(topic_names2);
 

}
export const getTop3 = (resource) =>{
    loadTopicNames('LearneringObjects.json',1)
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

export const NSWloadLearnerData = async(filename,subject)=>{
  loadTopicNames('LearneringObjects.json',1)
  data = NSWlearnerdata;
  
  NSWlearners = Object.values(data);
  
    NSWlearners.forEach(learner => {
      NSWlearner_icon.push("👤");
      NSWlearner_x.push(learner["ld"]["x"])
      NSWlearner_y.push(learner["ld"]["y"])
      NSWlearners_polyline.push({ [learner["Learner Id"]]: learner["polyline"]})
      NSWlearners_file_name.push( learner["file name"])
      NSWlearners_id.push(learner["Learner Id"])
       });
       
     
}

export const MLloadLearnerData = async(filename,subject)=>{
  loadTopicNames('LearneringObjects.json',1)
  data = MLlearnerdata;
  
  MLlearners = Object.values(data);
  
    MLlearners.forEach(learner => {
      MLlearner_icon.push("👤");
      MLlearner_x.push(learner["ld"]["x"])
      MLlearner_y.push(learner["ld"]["y"])
      MLlearners_polyline.push({ [learner["Learner Id"]]: learner["polyline"]})
      MLlearners_file_name.push( learner["file name"])
      MLlearners_id.push(learner["Learner Id"])
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



