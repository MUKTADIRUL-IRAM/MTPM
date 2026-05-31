import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    const location = useLocation();//useLocation() gives information about the current URL.
    console.log("Location from Private Router : ",location);
    

      if(loading) 
      {
           return (
                <div className="flex justify-center items-center h-16 bg-green-500 text-white">
                    <span className="loading loading-spinner loading-lg"></span>
                    <span className="ml-2">Checking user status...</span>
                </div>
          );
      }

    if(user)
    {
        return children;
    }

  return <Navigate to='/' state={location?.pathname} ></Navigate>
}

export default PrivateRouter;

//If I wanted to go "/workspace" & I'm not logged in it will take me to login page. 
//After landing to login page --> login page receives: location.state === "/workspace" where I wanted to go at first.