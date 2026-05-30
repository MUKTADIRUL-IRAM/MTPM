import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import { AiOutlineEnter } from "react-icons/ai";
import ProjectList from "./ProjectList";
import Welcome from "./Welcome";
import Swal from "sweetalert2";



const MainArea = ({workSpace})=>{

  const[projects,setProjects] = useState([]);
  const[projectName,setProjectName] = useState("");
  const[loadingProjects,setLoadingProjects] = useState(true);
  const[clickCreate,setClickCreate] = useState(null);
  const {user} = useContext(AuthContext);
  const[screen,setScreen] = useState("welcome");

  const location = useLocation();

  useEffect(()=>{

      const params = new URLSearchParams(location.search);
      const show = params.get("showProjects");

      if(show === "true")
      {
         setScreen("projects");
      }

      
   },[location]);

  //  useEffect(()=>{

  //   axios.get('https://mtpm-server.onrender.com/workSpace/getWorkSpaceList')
  //   .then((res)=>{
        
  //   }).catch((error)=>{

  //   })

  //  },[]);
  


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
    const data = {project_Name : projectName, workSpaceId : workSpace._id};
    axios.post('https://mtpm-server.onrender.com/project/postProjects',data,{withCredentials:true})
    .then((res)=>{
      setProjects(prev=>[...prev,res.data]);
      console.log("Successfully Created Project : ",res.data);
      setProjectName("");
      setClickCreate(false);
     }).catch((error)=>{
     const errorCode = error.code;
     console.log("Couldn't create project & errorCode is : ",errorCode);
     const errorMessage = error.message;
     console.log("Couldn't create project & errorMessage is : ",errorMessage);
     })
     
       

  };

  const handleDelete = (projectId)=>{
     
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {

    if (result.isConfirmed)
    {
       axios.delete(`https://mtpm-server.onrender.com/project/deleteProject/${projectId}`,{withCredentials:true})
       .then((res)=>{
        console.log("Response from backend after deletion : ",res.data);
        
         setProjects(prev=>
            prev.filter(project=> project._id !== projectId)
         );

        Swal.fire({
        title: "Deleted!",
        text: "Your Project has been deleted.",
        icon: "success"
      });

  }).catch((error)=>{
     console.log("Failed to Delete : ",error);
  })


    }
      
  
    
  
   

 
});


  };

   useEffect(()=>{
  //{withCredentials:true} = Works as a two way channel.
  //1.Stores Cookie sent by Backend.
  //2.Sending Cookie from Frontend to Backend.
     
    if(!workSpace?._id)
    {
        return;
    }

     setLoadingProjects(true);

     axios.get(`https://mtpm-server.onrender.com/project/getProjects/${workSpace._id}`,{withCredentials:true})
     .then((res)=>{
      setProjects(res.data);
      console.log("Successfully Fetched Projects data From MongoDB & Data is : ",res.data);
      
     }).catch((error)=>{
     const errorCode = error.code;
     console.log("Couldn't get project data & errorCode is : ",errorCode);
     const errorMessage = error.message;
     console.log("Couldn't get project data & errorMessage is : ",errorMessage);
  }).finally(()=>{
    setLoadingProjects(false);
  });



  },[workSpace._id]);//Empty array means it will run only once
      
    return(
        <div className="bg-amber-600 min-h-screen">

          

            <div className="w-full max-w-7xl mx-auto p-2">
              {
                screen === 'projects' && <ProjectList handleSubmit={handleSubmit} projectName={projectName} 
                setProjectName={setProjectName} projects={projects} loadingProjects={loadingProjects} 
                clickCreate={clickCreate} setClickCreate={setClickCreate} handleDelete={handleDelete} workSpace={workSpace}  ></ProjectList>
              }

              {
                screen === 'welcome' && <Welcome setScreen={setScreen} workSpace={workSpace}></Welcome>
              }
            </div>
       
        </div>
    );
};

export default MainArea;

