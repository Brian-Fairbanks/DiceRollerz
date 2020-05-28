import React, {useState} from "react";
import "./signup.css"
import { Container } from "../../components/Grid";
import {Link} from "react-router-dom"
import API from "../../utils/API"



function SignUp() {
const [userSubmission, setUserSubmission] = 
useState({
  username:"",
  password:"",
  password2: "",
  email: "",
  firstName: "",
  lastName: ""
});

function handleInputChange(event){
  const { name, value } = event.target;
  setUserSubmission({ ...userSubmission, [name]: value})
};

function handleFormSubmit(event) {
  event.preventDefault();
  if (true){
    API.signUpNewUser(
      userSubmission
    ).then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
  }
}

return(
<Container>
  <div class="row center center-align">
    <div class="col s12 m7 xl10">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <input placeholder="Username" name="username" onChange={handleInputChange} type="text" className="white-text"></input>
          <input placeholder="Password" name="password" onChange={handleInputChange} type="text" className="white-text"></input>
          <input placeholder="Confirm Password" onChange={handleInputChange} name="password2" type="text" className="white-text"></input>
          <input placeholder="Email" name="email" onChange={handleInputChange} type="email" className="white-text"></input>
          <input placeholder="First Name" onChange={handleInputChange} name="firstName" type="text" className="white-text"></input>
          <input placeholder="Last Name" onChange={handleInputChange} name="lastName" type="text" className="white-text"></input>
        </div>
        <div class="card-action">
        <button className="waves-effect waves-light btn red accent" onClick={handleFormSubmit}> Sign Up </button>
        <Link to= "/login"className="waves-effect waves-light btn red accent">Log In</Link>
        </div>
      </div>
    </div>
  </div>
</Container>
)
}

export default SignUp