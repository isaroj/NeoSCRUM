import React from 'react';


export default function Card({data}) {
  let feedback = data.feedback;
  let no = data.no;
  let author = data.author;

    return (
        <div class="card" rounded>
  <div class="card-body ">
    <h5 class="card-title back mt-4 mb-4 text-white">Feedback no : {no}</h5>
    <h6 class="card-subtitle mb-4 display-6 text-success">{feedback}</h6>
    <p class="card-text mt-4 text-danger" style={{fontSize : "20px"}}>sent by : {author}</p>
    {/* <p class="card-text text-dark text-white">{time}</p> */}
  </div>
</div>
    )
}
