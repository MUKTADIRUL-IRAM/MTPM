import { useContext } from "react";
import google from "../assets/Google__G__logo.svg.webp";
import fb from "../assets/facebook.webp";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registration = () => {

    const navigate = useNavigate();

    const {createUser,emailVerification,updateUserProfile,signUserOut,signInByGoogle,signInByFB} = useContext(AuthContext);

    const handleSubmit = (e)=>{

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        //Email and password Authentication
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

        function checkCredentials(email,password){

       const isEmailValid = emailRegex.test(email);// returns true/false
       const isPasswordValid = passwordRegex.test(password);

       return{
        isEmailValid,isPasswordValid
        //isEmailValid:isEmailValid,isPasswordValid:isPasswordValid
       };

     }
     
     const validateCredentials = checkCredentials(email,password);

     if(!validateCredentials.isEmailValid)
     {
       console.log("Email and Password are not Correct");
       Swal.fire('Invalid Email');
       return;
     }

     if(!validateCredentials.isPasswordValid)
     {
      console.log('Password not typed correctly');
      Swal.fire('Password must contain 1 uppercase & 1 number');
      return;
     }

     createUser(email,password)//'createUserWithEmailAndPassword' is async.I MUST call 'sendEmailVerification' after user is created
     .then(async(userCredentials)=>{

        const user = userCredentials.user;

        console.log("Info of User Just Created from Registration : ",user);

        e.target.reset();
        
        await updateUserProfile({displayName:`${name}`});
        
        await emailVerification();
//'emailVerification()' returns a promise.
//That means emailVerification() is being called and then the 'return' keyword passes the 'returned promise' to the next ".then()"
//'return' in '.then()' = “Wait for this before continuing”

       Swal.fire("Verify your email first!");

       await signUserOut();

       navigate('/');

 

     }).catch((error)=>{
        const errorCode = error.code;
        console.log("ErrorCode from Registration : ",errorCode);
        const errorMessage = error.message;
        console.log("ErrorMessage from Registration : ",errorMessage);
        Swal.fire("Something went wrong with server!");
     });

 };

 const handleGoogle = ()=>{

   signInByGoogle()
   .then((userCredentials)=>{
   const user = userCredentials.user; // The signed-in user info.
   Swal.fire("Registration Completed Successfully"); 
   console.log("Signed Up By Google : ",user);
   navigate('/');
  })
   .catch((error)=>{
   const errorCode = error.code;
   console.log("ErrorCode when try to register through Google : ",errorCode);
   const errorMessage = error.message;
   console.log("ErrorMessage when try to register through Google : ",errorMessage);
});

};

 const handleFacebook = ()=>{

   signInByFB()
   .then((userCredentials)=>{
   const user = userCredentials.user;
   Swal.fire("Registration Completed Successfully");  
   console.log("Signed Up By FaceBook : ",user);
   navigate('/');
   })
   .catch((error)=>{
   const errorCode = error.code;
   console.log("ErrorCode when try to register through Facebook : ",errorCode);
   const errorMessage = error.message;
   console.log("ErrorMessage when try to register through Facebook : ",errorMessage);

   })
};



   

    return (
       <div className="space-y-10 min-h-screen">
        {/* 1st Div */}
         <div className="font-bold sm:text-5xl sm:ml-24 text-3xl mt-10">Welcome to Sign-Up</div>
        
        {/* 2nd Div */}
         <div className="sm:flex sm:items-center w-2xs sm:w-2xl h-2/3 sm:h-96 shadow-lg rounded-xl p-4 bg-blue-500">
          <div>
                <form onSubmit={handleSubmit} className="" action="">
                  <fieldset className="fieldset">
                     <div className="space-y-4 mt-5">
                       <input type="text" className="input focus:outline-none" name="name" placeholder="Enter your full name" required/>
                       <input type="email" className="input focus:outline-none" name="email" placeholder="example@gmail.com" required/>
                       <input type="password" className="input focus:outline-none" name="password" placeholder="Create your password" required/>
                     </div>
                    <button className="btn btn-primary mt-3 sm:w-80">Sign Up</button>
                 </fieldset>
                </form>
          </div>

          <span className="block text-center font-medium mt-4 sm:mr-4">OR</span>

          {/* 3rd Div */}
          <div className="flex flex-col space-y-4 mt-4">
             <button onClick={handleGoogle} className="btn btn-neutral sm:w-64">
                <img className="w-8 h-8" src={google} alt="google_logo" />
                <div className="ml-1.5">Continue With Google</div>
             </button>

             <button onClick={handleFacebook} className="btn sm:w-64">
                <img className="w-12 h-12 ml-1.5" src={fb} alt="fb_logo" />
                <div className="">Continue With Facebook</div>
             </button>
          </div>

         </div>




       </div>
    );
};

export default Registration;