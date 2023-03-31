import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar/NavBar";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "./store/authSlice";

function App() {
    const isLoggedIn = useSelector(isLoggedInSelector());
    const location = useLocation();
    const elements = useRoutes(routes(isLoggedIn, location));
    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col'>
            <NavBar />
            {elements}
            <ToastContainer />
        </div>
    );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
