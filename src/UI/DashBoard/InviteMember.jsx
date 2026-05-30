import axios from "axios";
import { useEffect, useRef, useState } from "react";


const InviteMember = ({workSpace}) => {

  const[clickInviteMember,setClickInviteMember] = useState(false);
  const[email,setEmail] = useState("");
  const emailRef = useRef(null);
  const[role,setRole] = useState("");

 useEffect(()=>{

  const handleClickOutside = (e)=>{

    if(emailRef.current && !emailRef.current.contains(e.target))
    {
      setClickInviteMember(false);
    }
      

  };
 
   document.addEventListener('mousedown',handleClickOutside);

   return()=>{
    document.removeEventListener('mousedown',handleClickOutside);
   }

 },[]);

 const handleInvite = (e)=>{

     e.preventDefault();

     const invitationData = {workSpaceId : workSpace._id,email,role};

     axios.post("https://mtpm-server.onrender.com/invitation/createInvitedUserData",invitationData,{withCredentials : true})
     .then((res)=>{
      console.log("Invitation Data : ",res.data);
      setEmail("");
      setRole("");
      setClickInviteMember(false);
      
     }).catch((error)=>{

      const errorCode = error.code;
      console.log("Couldn't get InviteMember data & errorCode is : ",errorCode);
      const errorMessage = error.message;
      console.log("Couldn't get InviteMember data & errorMessage is : ",errorMessage);

    })

 };

  return (
    <div>
        {
          clickInviteMember ?
          <div ref={emailRef}>
            <form onSubmit={handleInvite} className="flex flex-col items-center gap-1.5" action="">
              <div className="flex gap-1">
                 <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input focus:outline-none" type="email" placeholder="Enter Email" required/>

                 <select className="select focus:outline-none" value={role} onChange={(e)=>setRole(e.target.value)} required>

                  <option value="" disabled hidden>Designation</option>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>

                 </select>
                 
              </div>

              <button type="submit" className="w-16 p-2 rounded-md bg-violet-500">Invite</button>
           </form>
          </div>
         
          :
          <><button onClick={()=>setClickInviteMember(true)} className="w-36 h-10 rounded-md bg-violet-600">Invite Members</button></>
        }
    </div>
  )
}

export default InviteMember;