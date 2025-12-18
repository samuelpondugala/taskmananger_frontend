import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Context from './context/Context'
const Login = () => {
    let [data,setData]=useState({"_id":"","pwd":""})
    let [msg,setMsg]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let obj = useContext(Context)
    let login=()=>{
        axios.post("https://taskmanager-backend-dvqj.onrender.com/login",data).then((res)=>{
            if(res.data.token!=undefined)
            {
                obj.stateUpdate(res.data)
                if(res.data.role=='emp')
                {
                    navigate("/home")
                }
                else{
                    navigate("/adminhome")
                }  
            }
            else{
                setMsg(res.data.msg)
            }
        })
    }
  return (
    <div className='form'>
        <h1 style={{"color":"red"}}>{msg}</h1>
        <input type='text' placeholder='Enter E-mail' onChange={fun} value={data._id} name="_id"/>
        <input type='password' placeholder='Enter password' onChange={fun} value={data.pwd} name="pwd"/>
        <button onClick={login}>Login</button>
        <Link className='forgot' to="/forgotpassword">Forgot Password?</Link>
    </div>
  )
}

export default Login