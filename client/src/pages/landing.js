import React from "react";
import Nav from "../components/Navbar";
import {Col, Row, Container} from "../components/Grid";
import Creepy from "./eleni-afiontzi-uSvtnSWDGmw-unsplash.jpg"
import Dungeon from "./prisha-eee-TeMuehXVXno-unsplash.jpg"

function Landing(){
return(
<div>

    <Row>
    {/* <div className="col s12 m7"> */}
    <Col size= "s12 m6">
      <div className="card">
        <div className="card-image">
          <img src={Dungeon} height="100%"/>
        </div>
        <div className="card-content">
          <p>Sign up adventurer! Be ready to join our vast community on epic journeys! </p>
        </div>
        <div className="card-action">
        <a className="waves-effect waves-light btn" href="#">Sign Up</a>
        </div>
      </div>
      </Col>
    {/* </div> */}
  

  
    {/* <div className="col s12 m7"> */}
    <Col size= "s12 m6">
      <div className="card">
        <div className="card-image">
          <img src= {Creepy} height= "410"/>
        </div>
        <div className="card-content">
          <p>Welcome Back traveler! Ready to continue your heroes story?</p>
        </div>
        <div className="card-action">
          <a className="waves-effect waves-light btn" href="/login">Log In</a>
        </div>
      </div>
      </Col>
    {/* </div> */}
    </Row>

</div>
    
)
}

export default Landing;