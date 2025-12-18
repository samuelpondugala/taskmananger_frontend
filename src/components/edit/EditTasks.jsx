import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context/Context";

const EditTasks = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    _id: "",
    task: [],
    name: "",
    deadline: ""
  });

  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();
  const obj = useContext(Context);

  useEffect(() => {
    if (obj.state.role !== "admin") {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:5000/edittask/${id}`)
      .then((res) => {
        const user = res.data[0];
        const temp = {
          _id: user._id,
          task: user.userTasks?.task || [],   // ensure it's an array
          name: user.name,
          deadline: user.deadline || ""
        };
        setData(temp);
      })
      .catch(() => {
        console.log("error while getting data to edit");
      });
  }, []);

  // Add a new task
  const updTask = () => {
    if (!details.trim()) return; // avoid empty tasks

    setData((prev) => ({
      ...prev,
      task: [...(prev.task || []), details],
      deadline: deadline || prev.deadline
    }));

    setDetails("");
    setDeadline("");
  };

  // Remove only the clicked task
  const closeTask = (index) => {
    setData((prev) => ({
      ...prev,
      task: prev.task.filter((_, i) => i !== index)
    }));
  };

  const addData = async () => {
    console.log(data);
    await axios.put("http://localhost:5000/updtask", data);
    if (obj.state.token !== "") {
      navigate("/addtask");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      {(!data.task || data.task.length === 0) && (
        <h1>There are no tasks assigned for {data.name}</h1>
      )}

      {data.task && data.task.length > 0 && (
        <table>
          <tbody>
            {data.task.map((el, id) => (
              <tr key={id}>
                <td>{el}</td>
                <td>
                  <button onClick={() => closeTask(id)}>Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Assign New Task</h3>
      <p>Enter Task Details</p>
      <input
        type="text"
        placeholder="Enter Task Details"
        name="details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <input
        type="date"
        name="deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={updTask}>Add Task</button>
      <button onClick={addData}>Add data</button>
    </div>
  );
};

export default EditTasks;
