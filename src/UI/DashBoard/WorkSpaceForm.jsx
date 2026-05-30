import axios from "axios";
import Top from "./Top";
import { useNavigate } from "react-router-dom";


const WorkSpaceForm = () => {

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
           
          e.preventDefault();
          const workSpaceName = e.target.workspace.value;

          if(!workSpaceName.trim())
          {return}

          axios.post('https://mtpm-server.onrender.com/workSpace/createWorkSpace',{workSpaceName},{withCredentials:true})
          .then((res)=>{

            console.log("Workspace created Successfully : ",res.data,"   Tenant Id Successfully added to user");
            navigate('/workspace');
            // navigate(`/dashboard?WSname=${workSpaceName}`);
         

          }).catch((error)=>{
            const errorCode = error.code;
            console.log("ErrorCode from workspaceform : ",errorCode);
            const errorMessage = error.message;
            console.log("ErrorMessage from workspaceform : ",errorMessage);
        
          })
    };


  return (
    <div>
        <Top></Top>
        <div className="w-screen min-h-screen flex justify-center bg-blue-600">
          <div className="w-96 md:w-2xl h-fit">
             <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-6 p-4 md:mt-24 bg-pink-500" action="#">
                <div className="flex flex-col gap-4">
                     <div className="flex flex-col gap-1">
                      <label className="label" htmlFor="workSpaceName">WorkSpaceName : </label>
                      <input className="input md:w-full focus:outline-none" type="text" name="workspace" placeholder="Iira Software Team" required/>
                     </div>
                     {/* <div className="flex flex-col gap-1">
                      <label className="label" htmlFor="workSpaceName">WorkSpaceName : </label>
                      <input className="input md:w-full focus:outline-none" type="text" name="workspace" placeholder="Iira Software Team"/>
                     </div> */}
                </div>
                <button type="submit" className="btn btn-accent">Submit</button>
             </form>
          </div>
        </div>
    </div>
  )
}

export default WorkSpaceForm;