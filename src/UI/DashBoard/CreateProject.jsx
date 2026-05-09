

const CreateProject = ({projectName,setProjectName,handleSubmit}) => {
  return (
    <div className="mt-28 md:mt-12">
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
                  }} className="ml-10 w-96 min-h-20 p-1 border border-[#3b82f6] rounded-md bg-[#22272b] 
                  text-gray-400 font-semibold placeholder:text-gray-400 placeholder:font-semibold 
                  placeholder:pl-2 placeholder:pt-5 md:ml-0 md:w-290 md:border-4 md:text-xl md:placeholder:text-2xl 
                  md:placeholder:pl-2
                  md:placeholder:pt-3
                  focus:outline-none" 
                  placeholder="Create Project"></textarea>
              </form>

              
            </div>
  )
}

export default CreateProject;