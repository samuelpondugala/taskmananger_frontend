import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context/Context";



const EditDetails = () => {
    const {id} = useParams()
    const [data, setData] = useState({
        "_id":"",
        "eid":"",
        "name":"",
        "dept":""
    })
    const navigate = useNavigate()
    const obj = useContext(Context)
    useEffect(()=>{
        if(obj.state.role=="admin"){
        axios.get(`http://localhost:5000/editstatus/${id}`).then((res)=>{
            const temp={"_id":res.data[0]._id,"eid":res.data[0].eid,"name":res.data[0].name,"dept":res.data[0].dept}
            setData({...data,...temp})
        }).catch(()=>{console.log("error while getting data to edit")})}
        else{navigate('/')}
    },[])
    const fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const updDetails=async()=>{
        await axios.put("http://localhost:5000/upddetails",data)
        navigate('/addtask')
    }
    const delUser=async(id)=>{
        await axios.delete(`http://localhost:5000/deluser/${id}`)
        navigate('/addtask')
    }
  return (
    <div>
      <input type="text" value={data._id} onChange={fun} />
      <input type="text" value={data.eid} onChange={fun} />
      <input type="text" value={data.name} onChange={fun} />
      <select name="dept" onChange={fun} value={data.dept}>
          <option value="" disabled>--Select Department--</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <button onClick={updDetails}>Update</button>
        <button style={{color:"red", fontWeight:"bold"}} onClick={()=>delUser(data._id)}>Delete User</button>
    </div>
  );
};

export default EditDetails;