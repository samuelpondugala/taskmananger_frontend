import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPass = () => {
  const [data, setData] = useState({ _id: "", pwd: "", otp: "" });
  const [pwd, setPwd] = useState({ pwd: "", pwd1: "" });
  const [msg, setMsg] = useState("");
  const [f, setF] = useState(0); // 0 = email, 1 = otp, 2 = new pwd
  const navigate = useNavigate();

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const pwdSet = (e) => {
    setPwd({ ...pwd, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    axios
      .get(`https://taskmanager-backend-dvqj.onrender.com/sendotp/${data._id}`)
      .then((res) => {
        if (res.data.msg === "otp sent") {
          setMsg(res.data.msg);
          setF(1);
        } else {
          setMsg(res.data.msg);
        }
      })
      .catch(() => setMsg("Something went wrong while sending OTP"));
  };

  const verifyOtp = () => {
    axios
      .get(`https://taskmanager-backend-dvqj.onrender.com/validateotp/${data._id}/${data.otp}`)
      .then((res) => {
        if (res.data.msg === "otpvalid") {
          setF(2);
          setMsg("");
        } else {
          setMsg(res.data.msg);
        }
      })
      .catch(() => setMsg("Something went wrong while verifying OTP"));
  };

  const resetPwd = () => {
    if (pwd.pwd !== pwd.pwd1) {
      setMsg("Passwords do not match");
      return;
    }

    const payload = {
      _id: data._id,
      pwd: pwd.pwd, // directly send from pwd state
    };
    axios
      .put("https://taskmanager-backend-dvqj.onrender.com/resetpwd", payload)
      .then((res) => {
        if (res.data.msg === "Password has been resetted successfully") {
          setMsg("");
          setF(0);
          setPwd({ pwd: "", pwd1: "" });
          setData({ _id: "", pwd: "", otp: "" });
          navigate("/");
        } else {
          setMsg(res.data.msg);
        }
      })
      .catch(() => setMsg("Something went wrong while resetting password"));
  };

  return (
    <div className="form">
      <h3 style={{ color: "red" }}>{msg}</h3>

      {f === 0 && (
        <>
          <input
            type="text"
            placeholder="Enter your email"
            name="_id"
            value={data._id}
            onChange={fun}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {f === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter your OTP"
            name="otp"
            value={data.otp}
            onChange={fun}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {f === 2 && (
        <>
          <input
            type="password"
            placeholder="Enter New Password"
            value={pwd.pwd}
            name="pwd"
            onChange={pwdSet}
          />
          <input
            type="password"
            placeholder="Enter Password again"
            value={pwd.pwd1}
            name="pwd1"
            onChange={pwdSet}
          />
          <button onClick={resetPwd}>Update Password</button>
        </>
      )}
    </div>
  );
};

export default ResetPass;
