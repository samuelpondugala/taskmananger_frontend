import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/Login'
import AddEmp from './components/AddEmp'
import Addtask from './components/Addtask'
import Home from './components/Home'
import Adminhome from './components/Adminhome'
import Logout from './components/Logout'
import './App.css'
import { useState } from 'react'
import Context from './components/context/Context'
import EditPage from './components/edit/EditPage'
import EditDetails from './components/edit/EditDetails'
import EditStatus from './components/edit/EditStatus'
import EditTasks from './components/edit/EditTasks'
import ResetPass from './components/ResetPass'

const App = () => {
  const [state, setState] = useState({"_id":"","eid":"","token":"","role":"","name":""})
  const stateUpdate=(stateObj)=>{
    setState({...state,...stateObj})
  }
  let obj = {
    "state":state,
    "stateUpdate":stateUpdate
  }
  return (
    <BrowserRouter>
    <Context.Provider value={obj}>
      <Nav/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/addemp' element={<AddEmp/>}/>
      <Route path='/addtask' element={<Addtask/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/adminhome' element={<Adminhome/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/edit' element={<EditPage/>}>
        <Route path='tasks/:id' element = {<EditTasks/>}/>
        <Route path='details/:id' element = {<EditDetails/>}/>
        <Route path='status/:id' element = {<EditStatus/>}/>
      </Route>
      <Route path='/forgotpassword' element={<ResetPass/>}/>
    </Routes>
    </Context.Provider>
    
    </BrowserRouter>
  )
}

export default App