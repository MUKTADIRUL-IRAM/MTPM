import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import { AiOutlineEnter } from "react-icons/ai";
import CreateProject from "./CreateProject";
import ProjectList from "./ProjectList";
import Welcome from "./Welcome";



const MainArea = ({screen,setScreen})=>{

  const[projects,setProjects] = useState([]);
  const[projectName,setProjectName] = useState("");

  const {user} = useContext(AuthContext);

  const handleSubmit = (e)=>{
     
    e.preventDefault();

    if(!user || !user.email)
    {
      console.log("User not ready yet");
      return; 
    }

    //Creating Projects
    if(!projectName.trim())
    {return}
    const data = {project_Name : projectName};
    axios.post('http://localhost:3000/project/postProjects',data,{withCredentials:true})
    .then((res)=>{
      setProjects(prev=>[...prev,res.data]);
      console.log("Successfully Created Project : ",res.data);
      setProjectName("");
     }).catch((error)=>{
     const errorCode = error.code;
     console.log("Couldn't create project & errorCode is : ",errorCode);
     const errorMessage = error.message;
     console.log("Couldn't create project & errorMessage is : ",errorMessage);
     })
     
       

  };

   useEffect(()=>{
  //{withCredentials:true} = Works as a two way channel.
  //1.Stores Cookie sent by Backend.
  //2.Sending Cookie from Frontend to Backend.
     axios.get("http://localhost:3000/project/getProjects",{withCredentials:true})
     .then((res)=>{
      setProjects(res.data);
      console.log("Successfully Fetched Projects data From MongoDB & Data is : ",res.data);
      
     }).catch((error)=>{
     const errorCode = error.code;
     console.log("Couldn't get project data & errorCode is : ",errorCode);
     const errorMessage = error.message;
     console.log("Couldn't get project data & errorMessage is : ",errorMessage);
  })



  },[]);//Empty array means it will run only once
      
    return(
        <div className="bg-amber-600 w-screen h-screen flex md:justify-center">

         {
          screen === 'create' && <CreateProject projectName={projectName} setProjectName={setProjectName} handleSubmit={handleSubmit}></CreateProject>
         }

         {
          screen === 'projects' && <ProjectList projects={projects} setScreen={setScreen}></ProjectList>
         }

         {
          screen === 'welcome' && <Welcome></Welcome>
         }
       
        </div>
    );
};

export default MainArea;

