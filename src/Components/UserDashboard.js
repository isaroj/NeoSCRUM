import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Card from './Card';
import NavBar from './NavBar';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';


export default function UserDashboard() {
    
     let token = null;
    const history = useHistory();

    const [data, setData] = useState([])
    const fetchDetails = async()=>{


    
        // axios.get("http://localhost:4000/GetAllRecievers", {
        //     headers : {
        //         Accept : "application/json",
        //         "Content-Type": "application/json",
        //         // Authorization : `Bearer ${token}`
        //     },
        //     credentials : "include"
            
        // })
        // .then(res => {
        //     console.log("RESPONSE", res.data);
        //     //const givenData = res.json();
        //     setData(res.data)
        // })
        // .catch(e => console.log("Err", e))

        // const res = await fetch("http://localhost:4000/DeveloperSignin",{
        //         method:"GET",
        //         headers:{
        //             Accept:"application/json",
        //             "Content-Type":"application/json",
                    
        //           },
        //         credentials:"include"
        //     });
            // const data = await res.json();
            // console.log(data)
        
        // console.log("DATA", res);
        let feadbacks = JSON.parse(localStorage.getItem("userFeadbacks"));
        // let newData = data.filter(d => d.email !== localStorage.getItem("userEmail"));
        // let newData = data.filter(d => d.Feadbacks.length !== 0);
        
         const allFeedbacks = feadbacks.map((d, index) =>({
             feedback : d.feadback,
             no : index + 1,
             author : "annonymous user"
         }))

         setData(allFeedbacks);
    }


    useEffect(()=>{
        // if(typeof window === "undefined")
        //     history.push("/signin")
        // else if(localStorage.getItem("jwtToken")){
            // token = JSON.parse(localStorage.getItem("jwtToken"));
            // console.log("TOKEN", token);
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
                            data.length === 0 ?
                            <>
                                <h1 className="display-6 text-center text-primary">Currently no feedbacks given to you!</h1>
                                
                                <img class="err" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg" />
                            </>
                            :
                            data.map((d, index) => (
                                <Col md={4} key={index}>
                                    <Card data={d}/>
                                </Col>
                            ))
                        }
                    </Row>  
                </Container>
                
            </div>
        </div>
    )
}
