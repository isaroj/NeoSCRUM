import axios from 'axios';
import React, {useEffect, useState} from 'react'
import NavBar from './NavBar';
import { Container, Row, Col } from 'reactstrap';
import FeedbackCard from './FeedbackCard';
import { useHistory } from 'react-router-dom';

export default function AddFeedback(props) {
    let token = null;
    let history = useHistory();

    const [data, setData] = useState([])

    const removeFeedback = (email)=>{
        setData(data.filter(eachFeedback => eachFeedback.email !== email))
    }

    const fetchDetails = async()=>{
        // axios.get("http://localhost:4000/GetAllRecievers", {
        //     headers : {
        //         Accept : "application/json",
        //         "Content-Type": "application/json",
        //         Authorization : `Bearer ${token}`
        //     },
        //     credentials : "include"
        // })
        // .then(res => {
        //     console.log("RESPONSE", res);
        //     const givenData = res.json();
        //     setData(givenData)
        // })
        // .catch(e => console.log("Err", e))


        const res = await fetch("http://localhost:4000/GetAllRecievers",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json" 
                  },
                credentials:"include"
            });

            const data = await res.json();

           let newdata = data.filter(d => d.email !== localStorage.getItem("userEmail"));
         const allFeedbacks = newdata.map(d =>({
             image : d.profile,
             name: d.name,
             email : d.email
         }))

         setData(allFeedbacks);
    }


    useEffect(()=>{
        // if(typeof window === "undefined")
        //     history.push("/signin")
        // else if(localStorage.getItem("jwtToken")){
        //     token = localStorage.getItem("jwtToken").token;
        if(localStorage.getItem("userEmail"))
        fetchDetails();
            else
        history.push("/signin")  
        }
        // else
        //     history.push("/signin")
       
    , []);

    return (
        <div>
            <NavBar />
            <div className="cards container">
                <Container fluid>
                    <Row>
                        {
                            data.map((d, index) => (
                                <Col md={4} key={index}>
                                    <FeedbackCard data={d} removeFeedback={removeFeedback}/>
                                </Col>
                            ))
                        }
                    </Row>  
                </Container>
                
            </div>
        </div>
    )
}
