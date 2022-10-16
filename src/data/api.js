import * as learnerdata from "./parsed_learner.json"
import * as resourceData from "./resource.json"
import * as resourceName from "./LearningObjects.json"
//hardcoded need to change 
const subject = 0 
//add export later

let data = [];
export let resources = []
export let learners_object = []; 
export const resource_x = []
export const resource_y = []
export const resources_polyline = []
export const resources_name = []
export const resources_type = []
export const resources_volume = []
export const resources_description = []
export const resource_icon = []

export let learners= []
export const learner_x = []
export const learner_y = []
export const learners_polyline = []
export const learners_name = []
export const learners_file_name = []
export const learners_id = []
export let topic_names = new Map();
export const learner_icon = [] ; 

export const loadResourceData = async (filename,subject)=>{
  loadTopicNames('LearneringObjects.json',1)
 
   data = JSON.stringify(resourceData)
   let t = JSON.parse(data)   
   resources = Object.values(t)
  loadTopicNames('LearneringObjects.json',1)
   resources.forEach(resource => {
    resource_icon.push("📄")
    resource_x.push(resource["ld"]["x"])
    resource_y.push(resource["ld"]["y"])
    resources_polyline.push({ [resource["name"]]: resource["polyline"]})
    resources_name.push([ resource["name"]])
    resources_type.push([ resource["type"]])
    resources_volume.push([ resource["resource_volume"] ])
    resources_description.push({[resource["name"]] : resource["resource_summary"]})
   });
   
  
}
export const loadTopicNames = (filename,subject) =>{
   data = JSON.stringify(resourceName)
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

export const loadLearnerData = async(filename,subject)=>{
  loadTopicNames('LearneringObjects.json',1)
  data = learnerdata;
  
  learners = Object.values(data);
  
    learners.forEach(learner => {
        learner_icon.push("👤");
        learner_x.push(learner["ld"]["x"])
        learner_y.push(learner["ld"]["y"])
        learners_polyline.push({ [learner["Learner Id"]]: learner["polyline"]})
        learners_file_name.push( learner["file name"])
        learners_id.push(learner["Learner Id"])
       });
       
     
}
const learnerResourceMapping = (subject)=>{
    const learner_contribution = [[]]
    for(let i = 0 ; i<learners[subject].length; i++){
        learner_contribution.push([]);
    }
    for(let j = 0; j<resources[subject].length; j++){
        if(resources[subject]["type"] == "learner"){
            let r_id = (resources[subject]["id"]).parseInt()+78;
            let r_name = resources[subject]["name"];
            for(let k = 0 ; k<learners_file_name.length;k++){
                if(learners_file_name[subject][k]==r_name){
                    learner_contribution[subject][k].push(r_id);
                }
            }
        }

    }

    const contri_learner = [{}]
    for(let i = 0 ; i<learner_contribution[subject].length;i++){
        for(let j = 0 ; j<learner_contribution[subject][i].length;j++){
            contri_learner[subject][learner_contribution[subject][j]] = learners_id[subject][i];
        }
    }
}
const actualTerrainData = (subject) =>{


}



