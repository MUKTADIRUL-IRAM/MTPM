import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";


const ToDo = ({id,taskUI,setTaskUI,workSpace}) => {

    const [open,setOpen] = useState(false);//For opening the task box when clicking "+Create"
    const [heading,setHeading] = useState(false);//For Heading e.g TO DO,IN INPROGRESS,DONE
    const [task,setTask] = useState("");//For Creating Task
    const [hoveredTaskId,sethoveredTaskId] = useState(null);//For Showing 'Edit icon & dot' when hovered over any Particular Task
    const [editingTaskId,setEditingTaskId] = useState(null);//When Click on Edit icon --> open the task box
    const [editText,setEditText] = useState("");// For Editing Text
    const [clickDot,setClickDot] = useState(null);//By Clicking Dots,open the panel
    const [changeStatus,setChangeStatus] = useState(null);//Open the changeStatus Panel to change Status

    const rectBoxRef = useRef(null);
    const menuRef = useRef(null);
    //const editRef = useRef(null); //We won't use it because "editRef only tracks ONE element".But it is inside .map()
    
    const todoTasks = taskUI?.filter(t => t.status === 'todo') || [];//array of todoTasks only

    useEffect(()=>{
      console.log("TaskUI Changed : ", taskUI);
    },[taskUI]);

    useEffect(()=>{

      const handleClickOutside = (e)=>{

         const isInsideCreate = rectBoxRef.current && rectBoxRef.current.contains(e.target);
         const isInsideMenu = menuRef.current && menuRef.current.contains(e.target);
         //const isInsideEditBox = editRef.current && editRef.current.contains(e.target);

        // 🚫 Ignore non-left clicks (scroll wheel, etc.)
         if(e.button !== 0)
         {
          return;
         }

           if(!isInsideCreate) 
           {
              setOpen(false);
           }

           if(!e.target.closest("form"))
           {
              setEditingTaskId(null);
              setEditText("");
           }

          if(!isInsideMenu)
          {
            setClickDot(null);
            setChangeStatus(null);
          }

          

      };
      //useEffect runs once to attach the event listener
      //then the browser keeps calling your function on every click, not React.
      document.addEventListener('mousedown',handleClickOutside);

      return()=>{
        document.removeEventListener('mousedown',handleClickOutside);
        
      }

    },[editingTaskId,clickDot]);

    const handleTask = (e)=>{

          e.preventDefault();

          //EDIT MODE
          if(editingTaskId)
          {
            const updateTask = {task : editText};

            axios.put(`https://mtpm-server.onrender.com/task/update_task/${editingTaskId}`,updateTask,{withCredentials:true})
            .then((res)=>{

              setTaskUI(prev=>
              //We have to run a '.map' here because we need "to update just ONE item inside the array"
              //.map --> creates new array
              //Step-by-step:
              //1.Take old array (prev)
              //2.Loop through each task
              //3.Replace only the matching one
              //4.Return a NEW array
              prev.map((t)=> t._id === editingTaskId ? {...t,task : res.data.task} : t));

              setEditingTaskId(null);
              setEditText("");
            })
            .catch((error)=>{
              console.log("Edit failed:", error);
            })

            return;
          }

          // 🟢 CREATE MODE
          if(!task.trim())
          {return}
          const data = {project_id : id,task : task,status : "todo",workSpaceId : workSpace._id};
          axios.post('https://mtpm-server.onrender.com/task/post_tasks',data,{withCredentials:true})
          .then((res)=>{
           console.log("Successfully Submitted Task To DataBase : ",res.data);
           setTask("");   //clear input
           setOpen(false);//close box
          // 🔥 THIS LINE helps to update UI instantly
           setTaskUI(prev => [...prev, res.data]);
          })
          .catch((error)=>{

            const errorCode = error.code;
            console.log("Couldn't submitted task to database & errorCode is : ",errorCode);
            const errorMessage = error.message;
            console.log("Couldn't submitted task to database & errorMessage is : ",errorMessage);

          });

    };

    const handleStatusChange = (taskId,newStatus)=>{
       
      axios.put(`https://mtpm-server.onrender.com/task/update_status/${taskId}`,{status : newStatus},{withCredentials:true})
      .then(res=>{
        console.log("STATUS RESPONSE:", res.data);
        setTaskUI(prev=>

                  prev.map((t)=> t._id === taskId ? {...t,status : res.data.status} : t )
                 );
      })
      .catch((error)=>{
        console.log("Failed to change Status : ",error);
        
      })
    };



  return (
    <div>
        {
            heading ? (
            <div onMouseLeave={()=>setHeading(false)} className="flex">
                <div className="bg-violet-600 rounded-md pl-1.5 w-23 mt-2 ml-2.5 md:ml-2 md:mt-4 md:w-78 md:text-2xl">TO DO</div>
                <div className="relative w-6 h-6 rounded-md text-center mt-2 ml-1 md:w-8 md:h-8 md:mt-4 md:ml-4 hover:bg-white/10"><span className="absolute bottom-1 right-1.5 md:bottom-2 md:right-2 text-xl md:text-2xl">...</span></div>
            </div>) 
            : 
            <div onMouseEnter={()=>setHeading(true)} className="flex">
                <div className="mt-2 ml-2.5 pl-1.5 rounded-md w-23 md:text-2xl md:ml-2 md:mt-4 md:w-78">TO DO</div>
            </div>
        }

        {
                        
            todoTasks.map((t)=>(

                <div onMouseEnter={()=>sethoveredTaskId(t._id)} onMouseLeave={()=>sethoveredTaskId(null)}
                className="flex items-center gap-2 bg-[#22272b] m-2 rounded-md p-2" key={t._id}>
                
                {/* Left side: text + edit icon */}
                <div className="flex items-center gap-1 flex-1 min-w-0">
                
                {
                    editingTaskId === t._id ?
                    // ✏️ TEXTAREA (EDIT MODE)
                    <div className="w-full">
                    <form onSubmit={handleTask} className="relative" action="">
                    <textarea autoFocus value={editText} onChange={(e)=>setEditText(e.target.value)} //onChange → updates state;value → reflects state
                    onKeyDown={(e)=>{
                    if(e.key === "Enter" && !e.shiftKey)
                    {
                        e.preventDefault();//stops newline in textarea
                        e.target.form.requestSubmit();
//e.target → the <textarea>;e.target.form → the parent <form> element;requestSubmit() → programmatically submits the form
//onKeyDown --> Detects Enter key;onSubmit --> Executes your logic (handleTask)
                    }
                    }}
            className="w-full min-h-20 p-1 border md:border-4 border-[#3b82f6] rounded-md bg-[#22272b] focus:outline-none"/>
             <button type="submit" className="absolute right-0.5 top-15.5 bg-blue-500"> <AiOutlineEnter></AiOutlineEnter> </button>
            </form>
            </div>
            :
            (<>
            <span className="truncate">{t.task}</span>

            {
            hoveredTaskId === t._id && (
            <div onClick={()=>{setEditingTaskId(t._id);setEditText(t.task)}}>
                <FaEdit size={20}></FaEdit>
            </div>
            )
            }
                    
            </>)
                        
            }
            </div>

            {
            editingTaskId !== t._id && 
            ( clickDot === t._id ?
                <div className="relative">
                    <BsThreeDots onClick={()=>setClickDot(null)} className="w-6 h-6 md:w-8 md:h-8 px-1 hover:bg-white/10 rounded-sm" size={20}></BsThreeDots>
                    <div ref={clickDot === t._id ? menuRef: null} className="flex flex-col items-center rounded-md border border-[#3b82f6] cursor-pointer
                    absolute z-10 top-6 right-10 md:w-34 md:h-44 md:top-7 md:right-28 bg-black">
                    {
                    changeStatus === t._id ?
                    <>
                        <div onClick={()=>setChangeStatus(null)} 
                        className="w-full text-center font-semibold rounded-tl-sm rounded-tr-sm border-b-2 
                        border-b-[#3b82f6] hover:bg-indigo-400">Change Status</div>

                        <div className="absolute w-14 left-14 md:w-34 md:left-32 flex flex-col items-center rounded-md border border-[#3b82f6] cursor-pointer bg-black">
                        <div onClick={()=>handleStatusChange(t._id,"in-progress")} className="w-full text-center font-semibold rounded-tl-sm rounded-tr-sm border-b-2 border-b-[#3b82f6] hover:bg-indigo-400">In Progress</div>
                        <div onClick={()=>handleStatusChange(t._id,"done")} className="w-full text-center font-semibold rounded-bl-sm rounded-br-sm hover:bg-indigo-400">Done</div>
                        </div>
                    </> 
                : 
                <>
                    <div onClick={()=>{console.log("Change Status clicked");setChangeStatus(t._id)}} 
                    className="w-full text-center font-semibold rounded-tl-sm rounded-tr-sm border-b-2 
                    border-b-[#3b82f6] hover:bg-indigo-400">Change Status</div>
                </>
                
                
                }
                            
                <div className="w-full text-center font-semibold border-b-2 border-b-[#3b82f6] hover:bg-indigo-400">Move Work Item</div>
                <div className="w-full text-center font-semibold border-b-2 border-b-[#3b82f6] hover:bg-indigo-400">Select Cover</div>
                <div className="w-full text-center font-semibold border-b-2 border-b-[#3b82f6] hover:bg-indigo-400">Add Flag</div>
                <div className="w-full text-center font-semibold border-b-2 border-b-[#3b82f6] hover:bg-indigo-400">Add Label</div>
                <div className="w-full text-center font-semibold border-b-2 border-b-[#3b82f6] hover:bg-indigo-400">Copy Link</div>
                <div className="w-full text-center font-semibold rounded-bl-sm rounded-br-sm hover:bg-indigo-400">Copy Key</div>
                </div>
            
            </div> 
            :
            <>
            <BsThreeDots onClick={()=>setClickDot(t._id)} className="w-6 h-6  md:w-8 md:h-8 px-1 hover:bg-white/10 rounded-md" size={10}></BsThreeDots>
            </>)
        }

                

        </div>))

                        
        }

        {
            open ? 
                (<div ref={rectBoxRef} className="px-0.5">
                <form className="relative" onSubmit={handleTask} action="">
                <textarea autoFocus value={task} onChange={(e)=>setTask(e.target.value)} 
                onKeyDown={(e)=>{
                if(e.key === "Enter" && !e.shiftKey)
                {
                    e.preventDefault();//stops newline in textarea
                    e.target.form.requestSubmit();
//e.target → the <textarea>;e.target.form → the parent <form> element;requestSubmit() → programmatically submits the form
//onKeyDown --> Detects Enter key;onSubmit --> Executes your logic (handleTask)
                }
                }}
            className="w-full min-h-20 p-1 border md:border-4 border-[#3b82f6] rounded-md bg-[#22272b]
            placeholder:text-gray-400 focus:outline-none" placeholder="What needs to be done?" />
            <button type="submit" className="absolute right-0.5 top-15.5 bg-blue-500"> <AiOutlineEnter></AiOutlineEnter> </button>
            </form>
            </div>) 
            :
            <div onClick={()=>setOpen(true)} className="flex items-center m-3 gap-1 rounded-lg py-1 hover:bg-white/10 hover:border">
            <span className="mb-1 text-2xl md:text-3xl md:ml-1 md:mb-1">+</span>
            <div className="md:text-2xl">Create</div>
            </div> 
                          
                            
        }
    </div>
  )
}

export default ToDo;