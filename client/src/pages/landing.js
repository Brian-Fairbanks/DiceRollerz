import React from "react";
import {Col, Row, Container} from "../components/Grid";
import Creepy from "./eleni-afiontzi-uSvtnSWDGmw-unsplash.jpg"
import Dungeon from "./prisha-eee-TeMuehXVXno-unsplash.jpg"

function Landing(){
return(
<div>

    <Row>
    {/* <div className="col s12 m7"> */}
    <Col size= "s12 m6">
      <div className="card blue-grey darken-1 center-align">
        <div className="card-image">
          <img src={Dungeon} height="450" width="auto"/>
        </div>
        <div className="card-content amber-text">
          <h5>Sign up adventurer! Be ready to join our vast community on epic journeys! </h5>
        </div>
        <div className="card-action">
        <a className="waves-effect waves-light btn red accent" href="/signup">Sign Up</a>
        </div>
      </div>
      </Col>
    {/* </div> */}
  

  
    {/* <div className="col s12 m7"> */}
    <Col size= "s12 m6">
      <div className="card blue-grey darken-1 center-align">
        <div className="card-image">
          <img src= {Creepy} height= "450" width="auto"/>
        </div>
        <div className="card-content amber-text">
          <h5>Welcome Back traveler! Ready to continue your heroes story?</h5>
        </div>
        <div className="card-action">
          <a className="waves-effect waves-light btn red accent" href="/login">Log In</a>
        </div>
      </div>
      </Col>
    {/* </div> */}
    </Row>

</div>
    
)
}

export default Landing;