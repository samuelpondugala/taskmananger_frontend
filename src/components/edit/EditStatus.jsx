import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context/Context";


const EditStatus = () => {
    const {id} = useParams()
    const [data, setData] = useState({"_id":"","status":""})
    const navigate = useNavigate()
    const obj = useContext(Context)
    useEffect(()=>{
        if(obj.state.role=="admin"){
        axios.get(`http://localhost:5000/editstatus/${id}`).then((res)=>{
            const temp = {"_id":res.data[0]._id,"status":res.data[0].userTasks.status}
            console.log(res.data)
            setData({...data,...temp})
        }).catch(()=>{console.log("error while getting data to edit")})}
        else{navigate('/')}
    },[])
    const fun=(e)=>{
        setData({...data,"status":e.target.value})
    }
    const updStatus=async()=>{
        await axios.put("http://localhost:5000/updstatus",data)
        navigate('/addtask')
    }
  return (
    <div>
        
      <select name="status" value={data.status} onChange={fun}>
        <option value="ongoing">On Going</option>
        <option value="completed">Completed</option>
        <option value="no tasks">No Tasks</option>
      </select>
      <button onClick={updStatus}>Update Status</button>
    </div>
  );
};

export default EditStatus;