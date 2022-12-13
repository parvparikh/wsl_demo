# Navigated Learning Portal in React
A responsive user interface which presents a discourse map for various courses where learners are placed based on their polyline information. Along with learners, learning objects like learner's contributions made throughout the course are also mapped and visualised in a Map (a novel approach similar to Google Maps with position of every object having some semantic meaning associated with it on the map). A Reactive UI where details about each learning object can be seen upon clicking the elements on the map. This idea can be adopted simiarly for any progression based system and learning progression is one of the aspect we try to address here

# Tech Stack 
- ReactJS : Frontend 
- Plotly.js and react-plotly : Plots and visualisation
- tailwind-css

Do note that this is migration from Learning-Map-Dash-Portal of which the code can be found [here](https://github.com/WSL-IIITB/Learning-Map-Dash-Portal/tree/mvp1). 

# Environment setup
- Clone this github repository
- Head inside the repository
- Run the command 
    ```sh
    npm i
    ```
- After all dependencies have been install, to run on localhost, run the command: 
   ```sh
    npm run start
    ```
# File Structure 
It follows a typical React.js based tree structure where all the UI is divided into pages, followed by Componenets residing in each page. Moving into the ``` src ``` folder, all pages' source code can be found in ``` Pages ``` folder which cosists of 2 pages in form of .jsx and the related components in a folder named ``` Componenets ```. Anyone with prior experience in React should be able to figure out the folder structure easily. Lastly inside ``` src ``` there is also a folder called ``` data ``` which consist of the backend logic in ``` api.js ``` as well as json files for various learning entity obtained by the work of other teams responsible for processing polyline information. 

# A reference for understanding the backend code
Inside ``` ./src/data/api.js ```
- Initially the code consists of all learning_objects container which is needed to persist for the UI 
- loadResourceData() as the name suggest for a subject populates the data structures with resource data into usable data by the UI in the containers defined above 
- loadLearnerContribution() stores the learners to their contribution mapping 
- loadTopicNames() loads the topic names from polyline json file which will be used as markers on the plotly.js plots
- getTop3(): computes the top 3 competencies of a learning entity and returns them in a list to be used in the UI. 
- Finally loadLearnerData() is intuitive as its sounds and do a similar function as Resource loader. 


# Test Deployment 
A version of the Navigated Learning platform is deployed over [172.16.201.162](https://172.16.201.162) locally on a test server which can be accessed on IIITB premises.


