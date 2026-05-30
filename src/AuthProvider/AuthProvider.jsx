import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { createUserWithEmailAndPassword, FacebookAuthProvider,GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {auth} from "../firebase/firebase_init";
//import app from '../firebase/firebase_init.js';
import axios from "axios";


//const auth = getAuth(app);



const AuthProvider = ({children}) => {
      
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const provider = new GoogleAuthProvider();
    const Fb_provider = new FacebookAuthProvider();

   
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    };

    const signInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    };

    const emailVerification = ()=>{
        return sendEmailVerification(auth.currentUser);
    };

    const updateUserProfile = (updatedData)=>{
        return updateProfile(auth.currentUser,updatedData);
    }

    const signInByGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    };

    const signInByFB = ()=>{
        setLoading(true);
        return signInWithPopup(auth,Fb_provider);
    };

    const signUserOut = ()=>{
        return signOut(auth);
    }

    useEffect(()=>{
          
        const unsubscribed = onAuthStateChanged(auth,(currentUser)=>{

              setUser(currentUser);
              console.log("Currently Logged In (From AuthProvider) : ",currentUser);//React State is Asynchronous,
                                                                                    //that's why we use 'currentUser' instead of 'user'

              //Getting Login Token
              if(currentUser?.email && currentUser.emailVerified)
              {
                const userEmail = {email : currentUser.email};
                axios.post("https://mtpm-server.onrender.com/auth/jwt",userEmail,{withCredentials:true})
                .then((res)=>{
                    console.log("Login Token (From AuthProvider) : ",res.data);
                    setLoading(false);
                })
                .catch((error)=>{
                    const errorCode = error.code;
                    console.log("Failed to get login token and Error Code is : ",errorCode);
                    const errorMessage = error.message;
                    console.log("Failed to get login token and Error Message is : ",errorMessage);
                    
                })
              }

              //Clearing Token While Log out
              else
              {
                axios.post("https://mtpm-server.onrender.com/auth/logout",{},{withCredentials:true})
                .then((res)=>{
                    console.log("Log-out Token (From AuthProvider) : ",res.data);
                    setUser(null);
                    setLoading(false);
                })
                .catch((error)=>{
                    const errorCode = error.code;
                    console.log("Failed to get logout token and Error Code is : ",errorCode);
                    const errorMessage = error.message;
                    console.log("Failed to get logout token and Error Message is : ",errorMessage);
                    
                })
              }
            


        })

        return()=>
        {
         unsubscribed();
        }

    },[]);

    const authInfo = {user,loading,setLoading,createUser,signInUser,emailVerification,updateUserProfile,signInByGoogle,signInByFB,signUserOut};

    return (
        <div>
          <AuthContext.Provider value={authInfo}>
             {children}
          </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;