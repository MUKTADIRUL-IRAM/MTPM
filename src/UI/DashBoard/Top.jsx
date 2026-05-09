import { useContext, useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { AuthContext } from "../../AuthContext/AuthContext";
import { auth } from "../../firebase/firebase_init";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainArea from "./MainArea";




const Top = ()=>{

   const[mobileViewOpen,setmobileViewOpen] = useState(false);
   const[menu,setMenu] = useState(false);
   const[query,setQuery] = useState('');
   const navigate = useNavigate();
   const menuRef = useRef(null);
   //const menuRefForMobile = useRef(null);
   //const mobileMenuRefForCreateGet = useRef(null);
  
   const[clickProject,setClickProject] = useState(false);

   const[screen,setScreen] = useState("welcome");
   
   const {user,signUserOut} = useContext(AuthContext);

   const location = useLocation();

   useEffect(()=>{

      const params = new URLSearchParams(location.search);
      const show = params.get("showProjects");

      if(show === "true")
      {
         setScreen("projects");
      }
      
      
   },[location]);

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
                                    <div onClick={()=>setScreen("create")} className="w-full text-center border-b-2">Create</div>
                                    <div onClick={()=>{navigate('/dashboard?showProjects=true');setScreen("projects")}} className="w-full text-center">Get</div>
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
                                <button onClick={()=>setScreen("create")} className="w-24 bg-cyan-800">Create</button>
                                <button onClick={()=>{navigate('/dashboard?showProjects=true');setScreen("projects")}} className="w-24 bg-fuchsia-700">Get</button>
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






                    </div>

                   
             </div>
              
            <MainArea setScreen={setScreen} screen={screen}></MainArea>
                  

            


                
          </div>
        
    );

   

};

export default Top;