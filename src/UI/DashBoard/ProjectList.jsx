import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";



const ProjectList = ({projects,loadingProjects,handleSubmit,projectName,setProjectName,clickCreate,setClickCreate,handleDelete,workSpace}) => {

 

  if(loadingProjects){
     return(
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
  );
  }

  return (
      <>

      {
        clickCreate && (
            <div className="mt-12">
              <form onSubmit={handleSubmit} action="">
                 <textarea value={projectName} onChange={(e)=>setProjectName(e.target.value)} 
                  onKeyDown={(e)=>{
                    if(e.key === "Enter" && !e.shiftKey)
                    {
                      e.preventDefault();//stops newline in textarea
                      e.target.form.requestSubmit();
//e.target → the <textarea>;e.target.form → the parent <form> element;requestSubmit() → programmatically submits the form
//onKeyDown --> Detects Enter key;onSubmit --> Executes your logic (handleSubmit)
                    }
                  }} className="w-80 ml-4 min-h-20 p-1 border border-[#3b82f6] rounded-md bg-[#22272b] 
                  text-gray-400 font-semibold placeholder:text-gray-400 placeholder:font-semibold 
                  placeholder:pl-2 placeholder:pt-5 md:ml-0 md:w-290 md:border-4 md:text-xl md:placeholder:text-2xl 
                  md:placeholder:pl-2
                  md:placeholder:pt-3
                  focus:outline-none" 
                  placeholder="Create Project"></textarea>
                  <button type="button" onClick={()=>{setClickCreate(false);setProjectName("");}}
                  className="w-20 font-semibold text-xl py-1 ml-32 md:ml-125 bg-red-600 rounded-md">Close</button>
              </form>

          
              
    </div>
        )
      }




        {
          projects.length !== 0 ? 
              
              <div className="w-84 h-fit flex flex-col mt-16 mx-auto md:mt-16 md:ml-1 md:w-6xl md:gap-4 md:p-4 bg-red-500">
              <div className="flex justify-between mt-2 pr-2 md:pr-1">
                 <h2 className="ml-2 text-xl md:text-3xl font-semibold md:ml-0">Project Lists</h2>
                 <button onClick={()=>setClickCreate(true)} className="w-20 font-semibold text-xl rounded-md bg-blue-600">Create</button>
              </div>
              
              <div className="flex flex-col gap-2 p-2 md:p-0">
                  {
                  projects.map((project,index)=>(
                  <div key={project._id} className="flex justify-between p-1 bg-[#1f1f21] border-2 border-gray-200 
                   text-white md:p-2 md:ml-0">
                    <div className="flex gap-2">
                       <div className="">{index+1}</div>
                       <Link state={{workSpace}} className="hover:underline w-16" to={`/project/${project._id}`}>{project.project_Name}</Link>
                    </div>
                   <button onClick={()=>handleDelete(project._id)} className="w-18 bg-blue-700 ml-44 md:ml-96">Delete</button>
                    
                   
                  </div>))
                  }
              
              </div>

              </div>
              
              

              : 
              
              <>
              {
                clickCreate ? <></>

                : 

              
              <div className="w-88 h-48 md:w-7xl md:h-96 mx-auto mt-56 p-4 text-white flex flex-col">
               <div className="text-xl md:text-7xl font-semibold inline-block wrap-break-word max-w-full">You don't have any Projects right now</div>
               <div className="mt-8 text-center text-xl md:text-7xl font-semibold">Create With Us.......</div>
               <div><button onClick={()=>setClickCreate(true)} className="ml-24 mt-6 md:mt-30 md:ml-125 w-fit p-1 md:p-2 font-semibold rounded-md md:text-2xl bg-black">Create Project</button></div>
              </div>              
              
              }
              </>

             
             



        }
      
      </>
  )
}

export default ProjectList;