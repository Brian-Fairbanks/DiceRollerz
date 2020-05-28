import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import Logo from "./DRZ.png";


function Nav() {

  return (
  <nav className="red" role="navigation">
    <div className="nav-wrapper container">
      <Link id="logo-container" to={"/"} className="brand-logo">
        <img src={Logo} alt="DRZ Logo" height="55"/>
      </Link>
      <div className="show-on-small" style={{ display: "none" }}>
        <a href="#" className="sidenav-trigger" data-target="nav-mobile"><i className="small material-icons">menu</i></a>
     </div>
      <div className="hide-on-small-only">
        <ul className="right">
          <li><Link to="/" title="Home"><i className="material-icons">home</i></Link></li>
          <li><Link to="/profile" title="My Profile"><i className="small material-icons">person</i></Link></li>
          <li><Link to="/chat" title="Chat Rooms"><i className="small material-icons">chat_bubble</i></Link></li>
        </ul>
      </div>

    </div>

    <ul id="nav-mobile" className="sidenav">
      <li><Link to="/"><i className="material-icons">home</i></Link> Home</li>
      <li><Link to="/profile"><i className="small material-icons">person</i> My Profile</Link></li>
      <li><Link to="/chat"><i className="small material-icons">chat_bubble</i> Chat Rooms</Link></li>
    </ul>
  </nav>
  );
}

export default Nav
