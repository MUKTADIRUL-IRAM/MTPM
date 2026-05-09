import { Link } from "react-router-dom";


const ProjectList = ({projects,setScreen}) => {
  return (
      <>
        {

          
          projects.length !== 0 ? 
            
              <div className="w-96 h-fit flex flex-col mt-12 ml-10 md:mt-16 md:ml-1 md:w-6xl md:gap-4 md:p-4 bg-red-600">
              <h2 className="ml-2 text-3xl font-semibold md:ml-0">Project Lists</h2>
              
              <div className="flex flex-col gap-2 p-2 md:p-0">
                  {
                  projects.map((project,index)=>(
                  <div key={project._id} className="flex gap-4 p-1 bg-[#1f1f21] border-2 border-gray-200  text-white md:p-2 md:ml-0">
                    <div className="ml-1">{index+1}</div>
                    <Link className="hover:underline" to={`/project/${project._id}`}>{project.project_Name}</Link>
                  </div>))
                  }
              
              </div>

              </div>
              
              

              : 
              
              <div className="w-96 h-44 md:w-7xl md:h-96 ml-14 mt-56 p-4 text-white flex flex-col bg-[#000000]">
               <div className="text-xl md:text-7xl font-semibold">You don't have any Projects right now</div>
               <div className="mt-8 text-center text-xl md:text-7xl font-semibold">Create With Us.......</div>
               <div><button onClick={()=>setScreen('create')} className="ml-28 mt-6 md:mt-30 md:ml-125 w-fit p-1 md:p-2 font-semibold rounded-md md:text-2xl bg-pink-500">Create Project</button></div>
              </div>
              
             
             



        }
      
      </>
  )
}

export default ProjectList;