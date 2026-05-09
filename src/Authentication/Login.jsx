import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";
import google from "../assets/Google__G__logo.svg.webp";
import fb from "../assets/facebook.webp";
import axios from "axios";


const Login = () => {

  const {signInUser,signUserOut} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
        
     e.preventDefault();

     const email = e.target.email.value;
     const password = e.target.password.value;

     signInUser(email,password)//'signInWithEmailAndPassword' is async.
     .then(async(userCredentials) => {
     // Signed in 
     const user = userCredentials.user;

     console.log('User-Data Received from Firebase : ',user);

     e.target.reset();

     if(!user.emailVerified)
     {
      Swal.fire('Verify your Email First');
      await signUserOut();
      return;
     }

     const userData = {name : user.displayName,email : user.email,verifiedEmail : user.emailVerified};

     await axios.post("http://localhost:3000/users/userData",userData,{withCredentials:true});
     
     Swal.fire("Logged in Successfully!");

     navigate('/dashboard');

     
    }).catch((error) => {
        const errorCode = error.code;
        console.log("ErrorCode : ",errorCode);
        const errorMessage = error.message;
        console.log("ErrorMessage : ",errorMessage);
        
      });


  };

     
    return (
        
        <div className="min-h-screen">

            <div className="mt-4 flex flex-col items-center">
              <h1 className="font-semibold text-xl mt-4">Iira Software</h1>
              <h3 className="font-medium">Cloud Free</h3>
           </div>

           <div className="mt-8 w-2xs sm:w-2xl h-2/3 sm:h-1/2 rounded-xl shadow-lg bg-amber-400 p-6">
           <div className="sm:flex flex-col"> 
                {/* 1st Div */}
               <div className="">
                {/* Get Started */}
              <div className="flex flex-col items-center">
                  <h1 className="font-bold text-2xl">Get Started</h1>
                  <h3 className="font-medium">Free up to 10 users</h3>
                  <legend className="sm:ml-0 mt-6 text-xl sm:text-2xl font-medium ">Log in to Continue</legend>
              </div>
               </div>

               {/* 2nd Div */}
                <div className="sm:flex space-x-8">
              {/* Login form */}
              <form onSubmit={handleSubmit} className="mt-6">
                  <fieldset className="text-xl fieldset">
                     <div className="mt-3 sm:flex flex-col">
                      <label className="label font-medium" htmlFor="">Email:</label>
                      <input type="text" className="input mt-1 w-60 sm:w-80" name="email" placeholder="ex:john@gmail.com" required />
                      <label htmlFor="" className="label font-medium mt-1">Password:</label>
                      <input type="password" className="input mt-1" name="password" placeholder="" required/>
                     </div>
                     <button className="btn btn-primary mt-1 sm:w-80">Submit</button>
                  </fieldset>
              </form>

               <div className="flex flex-col mt-3 space-y-1.5 sm:space-y-9 sm:mt-18">
                <button className="btn btn-neutral sm:w-64">
                    <img className="w-6 h-6 sm:w-8 sm:h-8" src={google} alt="google_logo" />
                    <div>Continue With Google</div>
                </button>
                <button className="btn sm:w-64">
                  <img className="w-7 h-7 sm:w-12 sm:h-12 ml-1.5" src={fb} alt="fb_logo" />
                  <div className="">Continue With Facebook</div>
                </button>
               </div>
              </div>

                {/* 3rd Div */}
                <div className="mt-3 sm:mt-8 sm:flex justify-center">
                  <span className="block text-center sm:font-medium ">Don't have an account?</span>
                  <Link to={'/registration'} className="text-blue-500 hover:underline sm:font-semibold block text-center">Create an Account</Link>
                </div>
                </div>
              

               
             
        </div>



        </div>
            
    
    );
};

export default Login;