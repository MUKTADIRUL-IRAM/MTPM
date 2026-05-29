import { Link, useNavigate } from "react-router-dom";
import Top from "./Top";
import { useEffect, useState } from "react";
import axios from "axios";
import InviteMember from "./InviteMember";

const WorkSpace = () => {

  const navigate = useNavigate();
  const[workSpaceList,setWorkSpaceList] = useState([]);
  

  useEffect(()=>{
      
    axios.get('http://localhost:3000/workSpace/getWorkSpaceList',{withCredentials : true})
    .then((res)=>{
      setWorkSpaceList(res.data);
      console.log("Successfully Fetched all the WorkSpaces : ",res.data);
      
    }).catch((error)=>{

      const errorCode = error.code;
      console.log("Couldn't get WorkSpaceList data & errorCode is : ",errorCode);
      const errorMessage = error.message;
      console.log("Couldn't get WorkSpaceList data & errorMessage is : ",errorMessage);

    })

  },[]);


  return (
     <div>
          <Top></Top>
          <div className="w-screen min-h-screen flex flex-col items-center gap-8 bg-blue-600">
              <button onClick={()=>navigate('/workspaceform')} className="btn btn-accent text-2xl py-10 mt-6">Create WorkSpace</button>
                      {
                         workSpaceList.length !== 0 && (<div className="md:w-6xl h-fit p-4 bg-black">
                            <div className="flex flex-col gap-4">
                                {
                                  workSpaceList.map((workSpace,index) => (
                                  <div key={workSpace._id} className="flex  gap-5">
                                      <div className="md:text-4xl text-fuchsia-600">{index+1}</div>
                                      <div className="md:w-6xl flex justify-between border border-black rounded-md p-3 bg-pink-600">
                                            <div className="flex flex-col justify-center gap-3">
                                                <div className="md:text-4xl">{workSpace.workSpaceName}</div>
                                                <div className="md:text-2xl">Members : {workSpace.members.length}</div>
                                            </div>
                                          <div className="flex flex-col items-center gap-3">
                                          <InviteMember workSpace={workSpace}></InviteMember>
                                          <Link to={`/workSpace/${workSpace._id}`}><button className="btn btn-primary">Enter</button></Link>
                                          </div>
                                            
                                      </div>
                                  </div>))
                                }
                            </div>
                            </div>)
                      }     
 
          </div> 

  
     </div>
  )
}

export default WorkSpace;