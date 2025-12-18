import React, { useContext, useEffect, useState } from 'react'
import Context from './context/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const obj = useContext(Context)
  const [task, setTask] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    if(obj.state.token!=""){
      axios.get(`https://taskmanager-backend-dvqj.onrender.com/gettasks/${obj.eid}`).then((res)=>{
        setTask([...res.data])
      })
      
    }else{
        navigate('/')}
  },[])
  return (
    <div>
      {task.length==0&&<h1>There are no Tasks assigned to you</h1>}
      <ul>
        {task.map((el,id)=>{
          return(
            <div key={id} style={{display:'flex'}}>
            <li>{el}</li>
            <button>Mark as Completed</button>
            </div>
          )
      })}
      </ul>
      
    </div>
  )
}

export default Home