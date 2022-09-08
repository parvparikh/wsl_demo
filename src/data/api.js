import * as learnerdata from "./parsed_learner.json"
import * as resourceData from "./resource.json"
//hardcoded need to change 
const subject = 0 
//add export later

let data = [];
export let resources = []
export const resource_x = []
export const resource_y = []
export const resources_polyline = []
export const resources_name = []
export const resources_type = []
export const resources_volume = []
export const resources_description = []
export const resource_icon = []

data = JSON.stringify(learnerdata)
export const learners= [JSON.parse(data)]
export const learner_x = []
export const learner_y = []
export const learners_polyline = []
export const learners_name = []
export const learners_file_name = []
export const learners_id = []


export const loadResourceData = async (filename,subject)=>{
   data = JSON.stringify(resourceData)
   let t = JSON.parse(data)   
   resources = Object.values(t)
  
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


const loadLearnerData = async(filename,subject)=>{
    learners[subject].forEach(learner => {
        learner_x.push([learner["ld"]["x"]])
        learner_y.push([learner["ld"]["y"]])
        learners_polyline.push({ [learner["Learner Id"]]: learner["polyline"]})
        learners_name.push([ learner["name"]])
        learners_file_name.push([ learner["file name"]])
        learners_id.push([learner["Learner Id"]])
        
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




// loadResourceData('Network_Science/resource.json',0)
//loadLearnerData('Network_Science/learner.json',0)