import React from "react";
import Logo from "./DRZ.png";


function Nav() {
  return (<nav className="red" role="navigation">
    <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">
      <img src={Logo} alt="DRZ Logo" height="55"/></a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#">Dice RollerZ</a></li>
      </ul>

      <ul id="nav-mobile" className="sidenav">
        <li><a href="#">Dice RollerZ</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">home</i></a>
    </div>
  </nav>
  );
}

export default Nav