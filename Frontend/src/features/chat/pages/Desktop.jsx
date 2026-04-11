import React from 'react'
import { useSelector } from 'react-redux'

const Desktop = () => {
    const {user} = useSelector(state => state.auth)
    console.log(user);
    
  return (
    <div>
      Deshboard 
    </div>
  )
}

export default Desktop
