import { createBrowserRouter } from "react-router-dom";
import Registration from "../Authentication/Registration";
import MainLayOut from "../LayOut/MainLayOut";
import Login from "../Authentication/Login";
import DashBoard from "../UI/DashBoard/DashBoard";
import ProjectPage from "../UI/DashBoard/ProjectPage";
import WorkSpace from "../UI/DashBoard/WorkSpace";
import WorkSpaceForm from "../UI/DashBoard/WorkSpaceForm";
import MainArea from "../UI/DashBoard/MainArea";
import PrivateRouter from "./PrivateRouter";


const router = createBrowserRouter([
    {
       path:'/',
       element:<MainLayOut></MainLayOut>,
       errorElement:"Page Not Found",
       children:[

        {
            path:'/',
            element:<Login></Login>
        },
        {
            path:'/registration',
            element:<Registration></Registration>
        },
        {
            path:'/dashboard',
            element:<PrivateRouter><DashBoard></DashBoard></PrivateRouter>
        },
        {
            path:'/project/:id',
            element:<PrivateRouter><ProjectPage></ProjectPage></PrivateRouter>
        },
        {
            path:'/workspace',
            element:<PrivateRouter><WorkSpace></WorkSpace></PrivateRouter>
        },
        {
            path:'/workspaceform',
            element:<PrivateRouter><WorkSpaceForm></WorkSpaceForm></PrivateRouter>
        },
        {
            path:'/workSpace/:workSpaceId',
            element:<PrivateRouter><DashBoard></DashBoard></PrivateRouter>
        },


      
       ]
    }
]);

export default router;