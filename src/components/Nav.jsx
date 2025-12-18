import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from './context/Context'

const Nav = () => {
  const obj = useContext(Context)

  return (
    <div className='nav'>
        {obj.state.token==""?<Link to="/">Login </Link>:<Link to="/logout">Logout</Link>}
        {obj.state.token==""&&<Link to="/addemp"> Register</Link>}
        {obj.state.role=="admin"&&<Link to="/adminhome">Add Task</Link>}
        {obj.state.role=="emp"&&<Link to="/home">Home</Link>}
        {obj.state.role=="admin"&&<Link to="/addtask">Home</Link>}
    </div>
  )
}

export default Nav