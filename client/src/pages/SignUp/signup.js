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
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        <a class="waves-effect waves-light btn" href="/chat">Sign Up</a>
        <a class="waves-effect waves-light btn" href="/login">Log In</a>
        </div>
      </div>
    </div>
  </div>
</Container>
)
}

export default SignUp