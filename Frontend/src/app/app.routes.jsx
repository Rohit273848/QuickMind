import {createBrowserRouter} from "react-router-dom";
import {Login} from "../features/auth/pages/Login";
import {Register} from "../features/auth/pages/Register";
import Home from "../features/auth/pages/Home";
import Desktop from "../features/chat/pages/Desktop";
import Protected from "../features/components/Protected";
import PublicRoute from "../features/components/PublicRoute";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<PublicRoute><Login/></PublicRoute>,
    },
    {
        path:"/register",
        element:<PublicRoute><Register/></PublicRoute>,
    },
    {
        path:"/",
        element:<Protected><Desktop/></Protected>
    },{
        path:"*",
        element:<Navigate to={'/'}/>
    }
])