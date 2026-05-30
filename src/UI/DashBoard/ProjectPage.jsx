import { useLocation, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { AiOutlineEnter } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import InProgress from "./InProgress";
import Done from "./Done";
import ToDo from "./ToDo";




const ProjectPage = () => {

    const {id} = useParams();
    const [projectName,setProjectName] = useState([]);
    const [taskUI,setTaskUI] = useState([]);//Store all the task
    const location = useLocation();

    const {workSpace} = location.state || [];

    console.log("WorkSpace is : ",workSpace);
    
    
    useEffect(()=>{

        axios.get(`https://mtpm-server.onrender.com/project/getSingleProject/${id}`,{withCredentials:true})
        .then((res)=>{
            setProjectName(res.data);
            console.log('Project Name is : ',res.data);
            
        })
        .catch((error)=>{
        const errorCode = error.code;
        console.log("ErrorCode GetSingleProject from ProjectPage : ",errorCode);
        const errorMessage = error.message;
        console.log("ErrorMessage GetSingleProject from ProjectPage : ",errorMessage);
        })



        axios.get(`https://mtpm-server.onrender.com/task/get_tasks/${id}`,{withCredentials:true})
        .then((res)=>{
            setTaskUI(res.data);
            console.log("Successfully Fetched Get-Task UI from Backend : ",res.data);
            
        })
        .catch((error)=>{
        const errorCode = error.code;
        console.log("ErrorCode TaskUI from ProjectPage : ",errorCode);
        const errorMessage = error.message;
        console.log("ErrorMessage TaskUI from ProjectPage : ",errorMessage);
        })

    },[id]);


  return (
    <div className="bg-amber-600 flex flex-col w-screen min-h-screen">
       <div className="mt-4 font-semibold text-2xl md:text-4xl py-2 text-center">{projectName.project_Name}</div>
       {/* Kanban Board */}
       <div className="w-screen h-[60vh] md:h-[80vh] mt-4 p-4 md:pt-8 flex justify-center items-start md:justify-evenly gap-2">

          {/* To Do Board */}
          <div className="w-38 md:w-96 min-h-96 md:min-h-4/5 max-h-full overflow-y-auto overflow-x-hidden rounded-lg text-white bg-[#17181a]">
           <ToDo workSpace={workSpace} id={id} taskUI={taskUI} setTaskUI={setTaskUI}></ToDo>
          </div>

          {/* In Progress Board */}
          <div className="w-38 md:w-96 min-h-96 md:min-h-4/5 max-h-full overflow-y-auto overflow-x-hidden rounded-lg text-white bg-[#17181a]">
             <InProgress workSpace={workSpace} id={id} taskUI={taskUI} setTaskUI={setTaskUI}></InProgress>
          </div>

          {/* Done Board */}
          <div className="w-38 md:w-96 min-h-96 md:min-h-4/5 max-h-full overflow-y-auto overflow-x-hidden rounded-lg text-white bg-[#17181a]">
             <Done workSpace={workSpace} id={id} taskUI={taskUI} setTaskUI={setTaskUI}></Done>
          </div>

       </div>

    </div>
  )
}

export default ProjectPage;