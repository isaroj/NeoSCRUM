import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, useHistory, NavLink} from 'react-router-dom';

const UserSignin = () => {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const data = {
      email,
      password
  }

  const isOkay = () => {
    let res = true;
    if (email === "" || password === "") {
      alert("fields can not be empty!");
      res = false;
    } else if (!reg.test(String(email).toLowerCase())) {
      alert("please give a valid email id");
      setEmail("");
      res = false;
    }else if(password.length <8){
      alert("minimum eight characters required");
      setPassword("");
      res = false;
    }
    return res;
  };

  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onHandleSubmit = async(e) => {
    e.preventDefault();
    if (isOkay()) {
      setLoading(true)
      try{
        const callback = await axios.post("http://localhost:4000/DeveloperSignin", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userImage", callback.data.UserLogin.profile)
        localStorage.setItem("userName", callback.data.UserLogin.name)
        localStorage.setItem("userFeadbacks", JSON.stringify(callback.data.UserLogin.Feadbacks));
        // console.log(callback.data.UserLogin.Feadbacks[0]);
        // console.log(localStorage.getItem("userFeadbacks"));
        setLoading(false)
        alert("login successfull")
         history.push("/dashboard")
      }catch(error){
        setLoading(false)
          console.log(error);
          alert("invalid user! check your email or password")
          setEmail("")
          setPassword("")
      }

        
      
      // axios.post("http://localhost:4000/DeveloperSignin", data, {
      //   header : {
      //     "Content-Type" : "application/json"
      //   },
      //   withCredentials: true,
      // })
      // .then((res)=>{
      //   console.log("LOGG", res.data);
      //     if(res.status === 200){
      //        if(typeof window !== "undefined"){
      //         localStorage.setItem("jwtToken", JSON.stringify(res.token))
      //          console.log("jwtToken", localStorage.getItem("jwtToken"));
      //          alert("login successfull")
      //           history.push("/dashboard")
      //        } 
      //     }
      // })
      // .catch((error)=>{
      //   alert("ERROR")
      //     console.log("ERROR", error);
      //     alert("Can not sign in")
      // })
    
      // console.log("CALLBACK_STATUS", callback.data.UserLogin.token);
      // let token = callback.data.UserLogin.token;
      // localStorage.setItem("token", token)
      // console.log("CALLBACK", callback.data.UserLogin.profile);
      
    }
  
  };

  return (
    <div>
      <h2 className="text-center mt-4 display-5">Login</h2>
      {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
      
      <form className="text-center form">
        <p>
          <label id="email" style={{marginTop : "50px"}} for="empMail">
            Email*
          </label>
          <input
            onChange={onEmailChange}
            className="empMail"
            type="email"
            id="empEmail"
            name="devEmail"
            placeholder="Email"
            value={email}
          />
        </p>
        <p className="profile" style={{marginLeft : "0px"}}>
        <label id="password" for="empPassword">
            Password*
          </label>
          <input
            onChange={onPasswordChange}
            type="password"
            id="empPassword"
            name="devPassword"
            placeholder="Password"
            value={password}
          />
        </p>

        <button
          onClick={onHandleSubmit}
          type="submit"
          className="btn btn-primary sub"
        >
          Login
        </button>
        <p>Don't have an account?
        <NavLink to="/register" exact>
              <span className="m-2 display-8">register here</span>
        </NavLink>
        </p>
      </form>
    </div>
  );
};

export default UserSignin;
