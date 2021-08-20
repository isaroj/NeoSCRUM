import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useHistory } from 'react-router-dom'



const Registration = () => {

  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  let [profileImage, setImage] = useState(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onImageChange = (event) => {
    // console.log("EVENT",event.target);
    setImage(event.target.files[0]);
  };
  
  //  console.log("IMAGE STATE",image);

  const userOb = {
      name,
      email,
      profileImage
  }

  const isOkay = () => {
    let res = true;
    if (name === "" || email === "" || profileImage === "") {
      alert("fields can not be empty!");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      alert("please give a valid name!");
      setName("");
      res = false;
    } else if (!reg.test(String(email).toLowerCase())) {
      alert("please give a valid email id");
      setEmail("");
      res = false;
    }
    return res;
  };

  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (isOkay()) {

      var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('profileImage',profileImage);
data.append('email', email);
data.append('name', name);

var config = {
  method: 'post',
  url: 'http://localhost:4000/register',
  headers: { 
    Accept:"application/json",
    'Content-Type': 'application/json', 
    // ...data.getHeaders()
  },
  data : data
};


      // const data = new FormData();
      // data.append("data", userOb);
      console.log("FORM", data);
      setLoading(true)
      axios(config)
      
      // axios.post("http://localhost:4000/register", data, {
      //   headers : {
      //     Accept : "application/json",
      //     "Content-Type": "application/json",
      // },
      // // credentials : "include"
      // })
      .then(res => {
        setLoading(false)
        console.log("RESPONSE", res.data);
        if(res.status === 200){
          alert("Registration successfull")
          history.push("/signin")
       }
      
      })
      .catch((error)=>{
        setLoading(false)
          console.log("ERROR",error);
          alert("User already registered! Please Log in to proceed")
      })
    }
  };

  return (
    <div>
      
      <h2 className="text-center mt-4 display-5">Enter New Developer</h2>
      {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
      <form className="text-center form">
        <p>
          <label id="name" for="empName">
            Employee Name*
          </label>
          <input
            onChange={onNameChange}
            className=" empName"
            type="text"
            id="empName"
            name="devName"
            placeholder="Employee Name"
            value={name}
          />
        </p>
        <p>
          <label id="email" for="empMail">
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
        <p className="profile">
          <input
            onChange={onImageChange}
            type="file"
            // id="empImage"
            // name="devImage"
             accept=".jpg,.jpeg,.png"
            // value={image}
          />
        </p>

        <button
          onClick={onHandleSubmit}
          type="submit"
          className="btn btn-primary sub"
        >
          Submit
        </button>
        <p>Already registered?
        <NavLink to="/signin" exact>
              <span className="m-2 display-8">sign in here</span>
        </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Registration;
