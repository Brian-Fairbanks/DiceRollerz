import React from "react";
import { Col, Row } from "../../components/Grid";
import { ParallaxBanner } from 'react-scroll-parallax';
import Bars from "./dungeonNull.png";
import Dungeon from "./prisha-eee-TeMuehXVXno-unsplash.jpg";
import Man from "./manNull.png";
import DropCap from "./DropCapDSmall.png";
import { Link } from "react-router-dom"
import './styles.css';
import './ParallaxBanner.css';

function Landing() {
  return (
    <div>
      <ParallaxBanner
        className="dungeon-banner"
        layers={[
          {
            image: Dungeon,
            amount: 0.3,
          },
          {
            image: Bars,
            amount: 0.1,
          },
          {
            image: Man,
            amount: -0.2,
          }
        ]}
        style={{
          height: '800px',
        }}
      >
        <div className="parallaxChildren">
          <Row>
            <h1 className="midieval title">Dice Rollerz</h1>
          </Row>
          <Row className = "card-container">
              <Col size="s12 m5">
                <div className="gold-border-raised logging-card">
                  <div className="card dark-trans center-align gold-border-dropped">
                    {/* <div className="card-image">
                    <img src={Dungeon} alt="Monochrome Red color-shift of a series of doors in a dungeon" height="450" width="auto" />
                  </div> */}
                    <div className="card-content midieval">
                      <h3 className="amber-text card-title">Sign up Adventurer!</h3>
                      <p className="white-text"> Be ready to join our vast community on epic journeys! </p>
                    </div>
                    <div className="card-action dark-trans">
                      <Link to="/signup" className="waves-effect waves-light btn red accent">Sign Up </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col size="s12 m2"></Col>

              <Col size="s12 m5">
                <div className="gold-border-raised logging-card">
                  <div className="card dark-trans center-align gold-border-dropped">
                    {/* <div className="card-image">
                    <img src={Creepy} alt="Dark silhouette of a man looking of a dungeon cell over a bright white background" height="450" width="auto" />
                  </div> */}
                    <div className="card-content amber-text midieval">
                      <h3 className="amber-text card-title">Welcome Back Traveler!</h3>
                      <p className="white-text">Ready to continue your heroes story?</p>
                    </div>
                    <div className="card-action dark-trans">
                      <Link to="/login" className="waves-effect waves-light btn red accent" >Log In</Link>
                    </div>
                  </div>
                </div>
              </Col>
          </Row>
        </div>
      </ParallaxBanner>

      <Row>
        <div className=" container card col s8 offset-s2 blue-grey darken-1" id="about-card">
          <h2 className="center-align amber-text midieval" >- About Us -</h2>
          <div className="card-content white-text about-content midieval">
            <div className="drop-wrap">
              <img className="drop-cap" src={DropCap} alt="D"></img>
            </div>
            <p className="drop-content">
              uring the Reign of the the Plague Lord, Covid XIX, 4 valiant developers began their
              independant quests to find the ultimate way to join their friends, and fill their
              desire, nay, their <b>need</b> to play Dungeons and Dragons.
              After many a night of independent searching, they began to realize that nothing
              would sate their specific desires. And so, they began to realize that there is
              only one way to have the perfect Online Tabletop Platform: To make it themselves.
            </p>
            <br />
            <br />
            <p className="center-align">
              - Thus, began the creation of Dice-Rollerz -
            </p>
            <br />
            <p>
              &nbsp;&nbsp;Brian Fairbanks: the Triton Cleric, Sergio Bracamontes: the Dragonborn
              warrior, Jonathan Andrews: the Kender Thief, and Jason Strouphaur: the human,
              joined forces in an attempt to thwart Covid XIX, rejoin their respective parties,
              and find new friends along the way so they may once more spend their leisure time
              performing their epic deeds.
            </p>
          </div>
        </div>
      </Row>




    </div>

  )
}

export default Landing;