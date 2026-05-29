import { useParams } from "react-router-dom";
import MainArea from "./MainArea";
import Top from "./Top";
import { useEffect, useState } from "react";
import axios from "axios";


const DashBoard = ()=>{

    const {workSpaceId} = useParams();
    const[workSpace,setWorkSpace] = useState(null);

    useEffect(()=>{

        axios.get(`http://localhost:3000/workSpace/getSingleWorkSpace/${workSpaceId}`,{withCredentials:true})
        .then((res)=>{
           setWorkSpace(res.data);
           console.log("Fetched WorkSpace is : " ,res.data);
           
        })
        .catch((error)=>{
        const errorCode = error.code;
        console.log("ErrorCode of GetSingleWorkSpace from DashBoard : ",errorCode);
        const errorMessage = error.message;
        console.log("ErrorMessage of GetSingleWorkSpace from DashBoard : ",errorMessage);
        })

    },[workSpaceId]);

    //state updates are asynchronous.Always protect async data with : " if(!data) return " OR conditional rendering: "data && <Component />"

    return(
        <div>
            <Top></Top>
            {
                workSpace ? 
                <>
                  <MainArea workSpace={workSpace}></MainArea>
                </> 
                : 
                <>
                 <div className="text-3xl text-white">Loading</div>
                </>
            }
        </div>
    )
};

export default DashBoard;