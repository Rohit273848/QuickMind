import {createBrowserRouter} from "react-router-dom";
import {Login} from "../features/auth/pages/Login";
import {Register} from "../features/auth/pages/Register";
import Desktop from "../features/chat/pages/Desktop";
import Welcome from "../pages/Welcome";

import Protected from "../features/components/Protected";
import PublicRoute from "../features/components/PublicRoute";


import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Welcome/>
    },
    {
        path:"/login",
        element:<PublicRoute><Login/></PublicRoute>,
    },
    {
        path:"/register",
        element:<PublicRoute><Register/></PublicRoute>,
    },
    {
        path:"/chat",
        element:<Protected><Desktop/></Protected>
    },{
        path:"*",
        element:<Navigate to={'/'}/>
    }
])