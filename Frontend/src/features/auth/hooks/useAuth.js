import { useDispatch } from "react-redux";
import {register,login,getMe} from "../services/auth.api"
import { setError,setLoading,setUser } from "../auth.slice";

export  function useAuth(){
    const dispatch = useDispatch();

    async function handleRegister({username,email,password}) {
        try{

            dispatch(setLoading(true))
            await register({username,email,password})
        }catch(error){
            console.error("Register Error from Hooks :", error.response?.data || error.message);
            throw error.response?.data || error.message;
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            const data=await login({email,password})
            dispatch(setUser(data.user))
        }catch(error){
            console.error("Login Error from Hooks :", error.response?.data || error.message);
            throw error.response?.data || error.message;
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
           const data= await getMe();
           dispatch(setUser(data.user))
        }catch(error){
            console.error("Get-Me Error from Hooks :", error.response?.data || error.message);
            throw error.response?.data || error.message;
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }
}
 