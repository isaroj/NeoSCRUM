import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function NavBar(props) {
     let image = localStorage.getItem("userImage");
     let name = localStorage.getItem("userName");;
     let history = useHistory();
     const logout = ()=>{
         if(typeof window !== "undefined"){
             localStorage.removeItem("jwtToken");
             axios.get("http://localhost:4000/logout", {
                headers : {
                    Accept : "application/json",
                    "Content-Type": "application/json",
                }
             })
             .then(res => {
                 
                 console.log("LOGOUT", res);
                 alert("successfully signed out")
                 localStorage.removeItem("userEmail")
                 localStorage.removeItem("userFeadbacks")
         history.push("/signin")
                
                })
             .catch(err => console.log("LRR",err))
             
         }
         
     }
    return (
        <>
        <nav>
            <div>
                <img class="navIcon" src={image} alt="profile photo" />
                <h4 className="name">{name}</h4>
            </div>
            <ul>

                <li><NavLink to="/feedback" exact>
                    <button

                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Feedback
                    </button>
                </NavLink></li>
                <li>
                    <button
                        onClick={logout}
                        type="submit"
                        className="btn btn-danger m-4"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
        </>
    )
}
