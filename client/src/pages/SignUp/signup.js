import React, {useState} from "react";
import "./signup.css"
import { Container } from "../../components/Grid";
import {Link, Redirect} from "react-router-dom"
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
const [isValid, setIsValid] = useState(false);

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
      // if sign up is valid...
      if(data.status === 200){
        setIsValid(true);
      }
    })
    .catch(err => console.log(err))
  }
}

return(
<Container>
  {isValid? <Redirect to="/chat" /> : ""}
  <div className="center center-align flex flex-align-center">
    <div className="col s12 m7 xl10">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <input 
          placeholder="Username" 
          name="username" 
          onChange={handleInputChange} 
          type="text" 
          className="validate white-text" 
          required="true" 
          aria-required="true"></input>
          <span className="helper-text" data-error="You Dishonor Me" data-success="You Chose Wisely">Choose Wisely</span>
          <input 
          placeholder="Password" 
          name="password" 
          onChange={handleInputChange} 
          type="password" 
          className="validate white-text" 
          required="true" 
          aria-required="true" 
          minLength="6"></input>
          <span className="helper-text" data-error="You Dishonor Me" data-success="You Chose Wisely">Choose Wisely</span>
          <input 
          placeholder="Confirm Password" 
          onChange={handleInputChange} 
          name="password2" 
          type="password" 
          className="validate white-text" 
          required="true" 
          aria-required="true" 
          minLength="6"></input>
          <span className="helper-text" data-error="You Dishonor Me" data-success="You Chose Wisely">Choose Wisely</span>
          <input 
          placeholder="Email" 
          name="email" 
          onChange={handleInputChange} 
          type="email" 
          className="validate white-text" 
          required="true" 
          aria-required="true"></input>
          <span className="helper-text" data-error="You Dishonor Me" data-success="You Chose Wisely">Choose Wisely</span>
          <input 
          placeholder="First Name" 
          onChange={handleInputChange} 
          name="firstName" type="text" 
          className="validate white-text" 
          required="true" 
          aria-required="true"></input>
          <span className="helper-text" data-error="You Dishonor Me" data-success="You Chose Wisely">Choose Wisely</span>
          <input 
          placeholder="Last Name" 
          onChange={handleInputChange} 
          name="lastName" type="text" 
          className="validate white-text" 
          required="true" 
          aria-required="true"></input>
          <span className="helper-text" data-error="You Dishonor Me" data-success="You Chose Wisely">Choose Wisely</span>
        </div>
        <div className="card-action">
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