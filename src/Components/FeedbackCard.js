import React, {useState} from 'react';
import axios from "axios";

export default function FeedbackCard({data, removeFeedback}) {

  const [feadback, setFeadback] = useState("");
  let name = data.name;
  let image = data.image;
  let email = data.email;
  const feadbackOb = {
    email,
    feadback
  }

  console.log("OB",feadbackOb)

  const onFeedbackChange = (event) => {
    setFeadback(event.target.value);
  };

  const onHandleSubmit = async(e)=>{
  
    e.preventDefault();
    if(isOkay()){
     
      // axios.post('http://localhost:4000/addFeadback', feadbackOb)
      // .then(function (response) {
      //   removeFeedback(name);
      //   alert("Feedback given successfully")
      // })
      // .catch(function (error) {
      //   console.log("FRR",error);
      //   alert("Unable to submit feedback")
      // });


      const res = await axios.post("http://localhost:4000/addFeadback",feadbackOb,{
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json" 
                  },
                credentials:"include"
            });
           
      
            console.log("RES", res.data);
            if(res.status === 200){
             alert("Feedback given successfully");
             setFeadback("");
             removeFeedback(email);
             console.log("FEEDBACK",feadback);
            }
            
    }else{
      alert("feadback field is empty")
    }
  }

  const isOkay = ()=>{
    let res = false;
    if(feadback.length !== 0){
      res = true;
    }
    return res;
  }

    return (
        <div class="card" style={{height : "65vh"}}>
  <img class="card-img-top fd" style={{marginLeft:"30px", marginTop:"10px"}}src={image} alt="Card image cap" />
  <div class="card-body" >
    <h5 class="card-title">{name}</h5>
    <p class="card-text">
        <textarea 
        value={feadback}
        onChange = {onFeedbackChange}
        name = "feedback"
        placeholder="Write your feedback here..."
        style={{resize : "none", border : "1px solid black"}}>
        
        </textarea>
        <h5>Max 100 characters</h5>
    </p>
    <button
          onClick={onHandleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit Feedback
        </button>
  </div>
</div>
    )
}
