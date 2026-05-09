import { Outlet } from "react-router-dom";


const MainLayOut = () => {
    return (
        <div className="flex justify-center">
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayOut;