import React from "react";
import "./signup.css"
import { Container } from "../../components/Grid";


function SignUp() {
return(
<Container>
  <div class="row center center-align">
    <div class="col s12 m7 xl10">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <input placeholder="Username" id="username" type="text" className="white-text"></input>
          <input placeholder="Password" id="password" type="text" className="white-text"></input>
        </div>
        <div class="card-action">
        <a className="waves-effect waves-light btn red accent" href="/chat">Sign Up</a>
        <a className="waves-effect waves-light btn red accent" href="/login">Log In</a>
        </div>
      </div>
    </div>
  </div>
</Container>
)
}

export default SignUp