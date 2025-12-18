import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Context from './context/Context'
import { Link, useNavigate } from 'react-router-dom'

const Addtask = () => {

  const obj = useContext(Context)

  const [data, setData] = useState([])
  const getData=async()=>{
      const res = await axios.get('https://taskmanager-backend-dvqj.onrender.com/getallemps')
      setData(...data,res.data)
  }
  const navigate = useNavigate()
  useEffect(()=>{
    if(obj.state.token!="" && obj.state.role=='admin'){
      getData()
    }else{
      navigate('/')
    }
  },[])
  
  return (
    <div>
      {data.length>0&&<table border={1}>
        <tr><th colSpan={8}>Employee Data</th></tr>
        <tr>
          <th>EMP ID</th>
          <th>EMP Email</th>
          <th>EMP Name</th>
          <th>EMP Department</th>
          <th>Tasks</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Edit Status</th>
          <th>Edit Tasks</th>
          <th>Edit Emp Details</th>
        </tr>
        {data.map((obj,idx)=>{
          return(
            <tr key={idx}>
              <td>{obj.eid}</td>
              <td>{obj._id}</td>
              <td>{obj.name}</td>
              <td>{obj.dept}</td>
              <td>{obj.userTasks.task.toString()}</td>
              <td>{obj.userTasks.deadline}</td>
              <td>{obj.userTasks.status}</td>
              <td><button ><Link to={`/edit/status/${obj.eid}`}>Edit Status</Link> </button></td>
              <td><button ><Link to={`/edit/tasks/${obj.eid}`}>Edit Tasks</Link> </button></td>
              <td><button ><Link to={`/edit/details/${obj.eid}`}>Edit Emp Details</Link> </button></td>
            </tr>
          )
        })}
        </table>}
    </div>
  )
}

export default Addtask