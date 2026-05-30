import { useContext, useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { AuthContext } from "../../AuthContext/AuthContext";
import { auth } from "../../firebase/firebase_init";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainArea from "./MainArea";
import { FaBell } from "react-icons/fa";
import axios from "axios";





const Top = ({fetchWorkSpaces})=>{

   const[mobileViewOpen,setmobileViewOpen] = useState(false);
   const[menu,setMenu] = useState(false);
   const[query,setQuery] = useState('');
   const navigate = useNavigate();
   const menuRef = useRef(null);
   const[notifications,setNotifications] = useState([]);
   const [openNotification,setOpenNotification] = useState(false);
   //const menuRefForMobile = useRef(null);
   //const mobileMenuRefForCreateGet = useRef(null);
  
   const[clickProject,setClickProject] = useState(false);

   //const[screen,setScreen] = useState("welcome");
   
   const {user,signUserOut} = useContext(AuthContext);

   //polling
   const fetchNotifications = ()=>{

      axios.get("http://localhost:3000/notification/getNotifications",{withCredentials:true})
      .then((res)=>{
         console.log("Successfully fetched all the notification :",res.data);
         setNotifications(res.data);//"React, please update this state on next render"
        
         
         
      }).catch((error)=>{

      const errorCode = error.code;
      console.log("Couldn't get notification data & errorCode is : ",errorCode);
      const errorMessage = error.message;
      console.log("Couldn't get notification data & errorMessage is : ",errorMessage);

    })

   };

   useEffect(()=>{

      fetchNotifications();

      const interval = setInterval(()=>{fetchNotifications();},3000);

      return ()=>clearInterval(interval);
      
   },[]);

   const unreadCount = notifications.filter((notification)=>notification.isRead === false).length//filter gives new array and length count the size of the array

   console.log("Notifications :",notifications);

   console.log("Unread Count :",unreadCount);

   //const location = useLocation();

   // useEffect(()=>{

   //    const params = new URLSearchParams(location.search);
   //    const show = params.get("showProjects");

   //    if(show === "true")
   //    {
   //       setScreen("projects");
   //    }

      
   // },[location]);

   useEffect(()=>{

      const handleClickOutside = (e)=>{
       
        if(menuRef.current && !menuRef.current.contains(e.target))
         {
           setMenu(false);
           setmobileViewOpen(false);
          
         }

      //    if(mobileMenuRefForCreateGet.current && !mobileMenuRefForCreateGet.current.contains(e.target))
      //    {
      //      setClickProject(false);
      //      setmobileViewOpen(true);
      //    }

      //   if(menuRefForMobile.current && !menuRefForMobile.current.contains(e.target))
      //   {
      //    setmobileViewOpen(false);
      //   }
        
      } 
     
      document.addEventListener('mousedown',handleClickOutside);

      return()=>{
         document.removeEventListener('mousedown',handleClickOutside);
      }
    
   },[]);

   const handleSignOut = ()=>{
      signUserOut(auth)
      .then(()=>{
          navigate('/');
          Swal.fire('Signed Out Successfully');
          console.log("Signed Out Successfully");
         })
         .catch((error)=>{
            const errorCode = error.code;
            console.log('Error in sign out : ',errorCode);
            const errorMessage = error.message;
            console.log('Error in sign out : ',errorMessage);
         })

   };

   const acceptInvitation = (invitationId)=>{
      //General PATCH syntax : axios.patch(url,data,config) if no data then axios.patch(url,{},config)
      axios.patch(`http://localhost:3000/invitation/acceptInvitation/${invitationId}`,{},{withCredentials:true})
      .then((res)=>{
         console.log("Successfully Add member to a WorkSpace & Changed Status in Invitation Collection : ",res.data);
         fetchWorkSpaces();

      setNotifications(prev=>
      //We have to run a '.map' here because we need "to update just ONE item inside the array"
      //.map --> creates new array
      //Step-by-step:
      //1.Take old array (prev)
      //2.Loop through each task
      //3.Replace only the matching one
      //4.Return a NEW array
      prev.map((notification)=> notification.invitationId._id === invitationId ? {...notification,isRead:true} : notification));
      setOpenNotification(false);
         

      }).catch((error)=>{

      const errorCode = error.code;
      console.log("Couldn't send Accept invitation data & errorCode is : ",errorCode);
      const errorMessage = error.message;
      console.log("Couldn't send Accept invitation & errorMessage is : ",errorMessage);

    });

   }

     const rejectInvitation = (invitationId)=>{

      axios.patch(`http://localhost:3000/invitation/rejectInvitation/${invitationId}`,{},{withCredentials:true})
      .then((res)=>{
         console.log("Couldn't Add member to a WorkSpace & Changed Status in Invitation Collection : ",res.data);

      setNotifications(prev=>
      //We have to run a '.map' here because we need "to update just ONE item inside the array"
      //.map --> creates new array
      //Step-by-step:
      //1.Take old array (prev)
      //2.Loop through each task
      //3.Replace only the matching one
      //4.Return a NEW array
      prev.map((notification)=> notification.invitationId._id === invitationId ? {...notification,isRead:true} : notification));
      setOpenNotification(false);
         

      }).catch((error)=>{

      const errorCode = error.code;
      console.log("Couldn't send Reject invitation data & errorCode is : ",errorCode);
      const errorMessage = error.message;
      console.log("Couldn't send Reject invitation & errorMessage is : ",errorMessage);

    });

   }



    return (
          <div>
            
             <div className="w-screen h-22 flex justify-between items-center md:justify-center  bg-[#1f1f21]">

                  <div className="flex space-x-14 items-center relative text-white md:hidden">
                     <button className="mb-1.5 ml-4" onClick={()=>{setmobileViewOpen(!mobileViewOpen);setClickProject(false)}}> <FiAlignJustify size={40}></FiAlignJustify> </button>
                          {mobileViewOpen && (
                            <div ref={menuRef} className="absolute top-17 w-24 h-16  text-white md:hidden">
                                <button onClick={()=>setClickProject(!clickProject)} className="w-24 p-1 bg-blue-400">Projects</button>
                                {clickProject && (
                                 <div className="w-24 absolute left-24 bottom-4 bg-gray-700 cursor-default">
                                    {/* <div onClick={()=>navigate('/dashboard?createProject=true')} className="w-full text-center border-b-2">Create</div> */}
                                    {/* <div onClick={()=>navigate('/dashboard?showProjects=true')} className="w-full text-center">Get</div> */}
                                 </div>)}
                                <button className="w-24 p-1 bg-violet-400">Profile</button>
                            </div>
                          )}



                     <div className=""> 
                         <form className="input w-48 flex bg-amber-400">
                            <input className="text-xl md:text-2xl placeholder-black" type="text" onChange={(e)=>setQuery(e.target.value)} value={query} placeholder="Search"/>
                            <button type="submit">
                                <svg className="w-[2em] h-[2em] text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                            >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                            </g>
                                </svg> 
                            </button>
                        </form>
                    </div>
                   
                    <div >
                        {
                           user &&
                           (<div className="">
                             {/* <div className="font-semibold w-fit bg-fuchsia-700 shadow-lg">{user.displayName}</div> */}
                             <div onClick={handleSignOut} className="font-semibold text-center w-22 p-1 bg-green-700 shadow-lg cursor-default">Sign Out</div>
                           </div>
                           )
                          
                        }
                        
                      </div>
                  


                  </div>

                    <div className="hidden md:w-7xl md:flex md:justify-evenly md:items-center">
                      <div ref={menuRef} className="relative bg-green-500">
                         <button onClick={()=>setMenu(!menu)} className="font-semibold md:w-24 md:h-12 bg-blue-500 shadow-lg">Projects</button>
                         {menu && (
                            <div className="absolute bg-[#1f1f21]">
                                {/* <button onClick={()=>navigate('/dashboard?createProject=true')} className="w-24 bg-cyan-800">Create</button> */}
                                {/* <button onClick={()=>navigate('/dashboard?showProjects=true')} className="w-24 bg-fuchsia-700">Get</button> */}
                            </div>
                         )}
                      </div>

                     

                      <div >
                        {
                           user &&
                           (<div className="flex gap-2">
                             <div className="font-semibold md:w-fit p-2 bg-fuchsia-700 shadow-lg">{user.displayName}</div>
                             <div onClick={handleSignOut} className="font-semibold md:w-20 p-2 bg-green-700 shadow-lg cursor-default">Sign Out</div>
                           </div>)
                          
                        }
                        
                      </div>

                       <div className="mr-5"> 
                         <form className="input md:w-xl flex bg-amber-400">
                            <input className="text-xl md:text-2xl placeholder-black" type="text" onChange={(e)=>setQuery(e.target.value)} value={query} placeholder="Search"/>
                            <button type="submit">
                                <svg className="w-[2em] h-[2em] text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                            >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                            </g>
                                </svg> 
                            </button>
                        </form>
                       </div>


                     <div className="relative">

                        <FaBell onClick={()=>setOpenNotification(!openNotification)} className="text-white" size={40}></FaBell>

                        {
                           unreadCount > 0 && (<div className="absolute -top-2 -right-2 bg-red-500 text-white
                           rounded-full w-6 h-6 flex justify-center items-center text-sm font-bold">
                           {unreadCount}
                           </div>)
                        }

                        {
                           openNotification && (
                           <div  className="flex flex-col absolute right-0 mt-2 w-80 h-fit bg-black shadow-lg rounded-lg z-50">
                                {
                                 notifications.map((notification)=>(
                                    <div className="w-76 mx-auto bg-[#545454] p-2 m-2 shadow-lg rounded-md" key={notification._id}>
                                        {
                                          notification.type === "workspace_invite" && (
                                             <div className="flex flex-col justify-center items-center gap-2">

                                                <div className="">{notification.message}</div>

                                                <div className="md:w-56 flex justify-between">

                                                   <button  onClick={()=>acceptInvitation(notification.invitationId._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>

                                                   <button  onClick={()=>rejectInvitation(notification.invitationId._id)}
                                                   className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>

                                                </div>

                                             </div>
                                          )
                                        }
                                    </div>
                                 ))
                                }
                           </div>)
                        }

                     </div>



                  </div>

                   
             </div>
              
            {/* <MainArea screen={screen}></MainArea> */}
                  

            


                
          </div>
        
    );

   

};

export default Top;