import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import Logo from "./DRZ.png";


function Nav() {
  return (<nav className="red" role="navigation">
    <div className="nav-wrapper container">
      <Link id="logo-container" to={"/"} className="brand-logo">
        <img src={Logo} alt="DRZ Logo" height="55"/>
      </Link>
      <ul className="right hide-on-med-and-down">
        <li><Link to={"/"}>Dice RollerZ</Link></li>
      </ul>

      <ul id="nav-mobile" className="sidenav">
        <li><Link to={"/"}>Dice RollerZ</Link></li>
      </ul>
      <Link to={"/"} data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">home</i></Link>
    </div>
  </nav>
  );
}

export default Nav
