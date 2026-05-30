import { createBrowserRouter } from "react-router-dom";
import Registration from "../Authentication/Registration";
import MainLayOut from "../LayOut/MainLayOut";
import Login from "../Authentication/Login";
import DashBoard from "../UI/DashBoard/DashBoard";
import ProjectPage from "../UI/DashBoard/ProjectPage";
import WorkSpace from "../UI/DashBoard/WorkSpace";
import WorkSpaceForm from "../UI/DashBoard/WorkSpaceForm";
import MainArea from "../UI/DashBoard/MainArea";

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
            element:<DashBoard></DashBoard>
        },
        {
            path:'/project/:id',
            element:<ProjectPage></ProjectPage>
        },
        {
            path:'/workspace',
            element:<WorkSpace></WorkSpace>
        },
        {
            path:'/workspaceform',
            element:<WorkSpaceForm></WorkSpaceForm>
        },
        {
            path:'/workSpace/:workSpaceId',
            element:<DashBoard></DashBoard>
        },

      
       ]
    }
]);

export default router;