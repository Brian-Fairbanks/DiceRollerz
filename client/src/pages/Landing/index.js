import React from "react";
import { Col, Row } from "../../components/Grid";
import Creepy from "./eleni-afiontzi-uSvtnSWDGmw-unsplash.jpg"
import Dungeon from "./prisha-eee-TeMuehXVXno-unsplash.jpg"
import DropCap from "./DropCapDSmall.png";
import { Link } from "react-router-dom"
import './styles.css';

function Landing() {
  return (
    <div>

      <Row>
        <Col size="s12 m6">
          <div className="card blue-grey darken-1 center-align">
            {/* <div className="card-image">
              <img src={Dungeon} alt="Monochrome Red color-shift of a series of doors in a dungeon" height="450" width="auto" />
            </div> */}
            <div className="card-content amber-text">
              <h5>Sign up adventurer! Be ready to join our vast community on epic journeys! </h5>
            </div>
            <div className="card-action">
              <Link to="/signup" className="waves-effect waves-light btn red accent">Sign Up </Link>
            </div>
          </div>
        </Col>

        <Col size="s12 m6">
          <div className="card blue-grey darken-1 center-align">
            {/* <div className="card-image">
              <img src={Creepy} alt="Dark silhouette of a man looking of a dungeon cell over a bright white background" height="450" width="auto" />
            </div> */}
            <div className="card-content amber-text">
              <h5>Welcome Back traveler! Ready to continue your heroes story?</h5>
            </div>
            <div className="card-action">
              <Link to="/login" className="waves-effect waves-light btn red accent" >Log In</Link>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <div className=" container card col s8 offset-s2 blue-grey darken-1" id="about-card">
          <h2 className="center-align amber-text midieval" >- About Us -</h2>
          <div className="card-content white-text about-content midieval">
            <div className="drop-wrap">
              <img className="drop-cap" src={DropCap} alt="D"></img>
            </div>
            <p className="drop-content">
              uring the Reign of the the Plague Lord, Covid XIX, 4 valiant developers began their independant quests to find the ultimate way to join their friends, and fill their desire, nay, their <b>need</b> to play Dungeons and Dragons.
              After many a night of independent searching, they began to realize that nothing would sate their specific desires. And thus, they began to realize that there is only one way to have the perfect Online Tabletop Platform: To make it themselves.
            </p>
            <br />
            <br />
            <p className="center-align">
              - Thus, began the creation of Dice-Rollerz -
            </p>
            <br />
            <p>
              &nbsp;&nbsp;Brian Fairbanks: the Triton Cleric, Sergio Bracamontes: the Dragonborn warrior, Jonathan Andrews: the blank blank, and Jason Strouphaur: the blank blank, joined forces in an attempt to thwart Covid XIX, rejoin their respective parties, and find new friends along the way so they may once more spend their leisure time performing their epic deeds.
            </p>
          </div>
        </div>
      </Row>




    </div>

  )
}

export default Landing;