import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useChat} from "../hooks/useChat"




const Desktop = () => {
  
  const chat = useChat()
  

    const {user} = useSelector(state => state.auth)
    console.log(user);

    useEffect(()=>{
      chat.initializeSocketConnection();
    },[])
    
  return (
    <div>
      Deshboard 
    </div>
  )
}

export default Desktop
