import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddEmp = () => {
  
  const [data, setData] = useState({
    "_id":"",
    "eid":"",
    "pwd":"",
    "name":"",
    "dept":""
  })
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const fun = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const reg=()=>{
    axios.post("https://taskmanager-backend-dvqj.onrender.com/reg",data).then((res)=>{
        setMsg(res.data.msg)
    })
    setData({
    "_id":"",
    "eid":"",
    "pwd":"",
    "name":"",
    "dept":""
  })
  navigate('/')

  }
  return (
    
    <div className='form-con' >
      <div className='reg-form'>
        <h1>{msg}</h1>
        <input type="text"  name='_id' onChange={fun} value={data._id} placeholder='Enter your Email'/>
        <input type="text"  name='eid' onChange={fun} value={data.eid} placeholder='Enter your Emp Id'/>
        <input type="password"  name='pwd' onChange={fun} value={data.pwd} placeholder='Enter your password'/>
        <input type="text"  name='name' onChange={fun} value={data.name} placeholder='Enter your name'/>
        <select name="dept" onChange={fun} value={data.dept}>
          <option value="" disabled>--Select Department--</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <button onClick={reg}>Register</button>
      </div>  
    </div>
  )
}

export default AddEmp