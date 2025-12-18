import React, { useContext, useEffect } from 'react'
import Context from './context/Context'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const obj = useContext(Context)
  const navigate = useNavigate()
  useEffect(()=>{
    obj.stateUpdate({"token":"","role":"","name":""})
  navigate('/')
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout