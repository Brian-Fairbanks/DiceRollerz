import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./DRZ.png";
import userContext from "../../utils/userContext";


function Nav(props) {
  const {M} = props;
  document.addEventListener('DOMContentLoaded', function() {
    let sidenav = document.querySelector('.sidenav.fullnav');
    //console.log(sidenav);
    M.Sidenav.init(sidenav, {});
  })

  // Log Out Functionality
  // ========================
  const { setUser, setToken } = useContext(userContext);

  function logOut() {
    //console.log("Logging out!");
    localStorage.removeItem("jwtToken");
    setUser({
      _id: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: ''
    });
    setToken("NotSet");
  }


  return (
    <nav className="red" role="navigation">
      <div className="nav-wrapper container">
        <Link id="logo-container" to={"/"} className="brand-logo">
          <img src={Logo} alt="DRZ Logo" height="55" />
        </Link>
        <div className="show-on-small" style={{ display: "none" }}>
          <div className="sidenav-trigger cur-pointer" data-target="nav-mobile"><i className="small material-icons">menu</i></div>
        </div>
        <div className="hide-on-small-only">
          <ul className="right">
            <li><Link to="/" title="Home"><i className="material-icons">home</i></Link></li>
            <li><Link to="/profile" title="My Profile"><i className="small material-icons">person</i></Link></li>
            <li><Link to="/chat" title="Chat Rooms"><i className="small material-icons">chat_bubble</i></Link></li>
            <li><a onClick={() => { logOut() }}><i className="small material-icons">phonelink_erase</i></a></li>
          </ul>
        </div>

      </div>

      <ul id="nav-mobile" className="sidenav fullnav blue-grey darken-3">
        <li><Link to="/" className="amber-text"><i className="material-icons" style={{ color: "#ffc107" }}>home</i>Home</Link></li>
        <li><Link to="/profile" className="amber-text"><i className="small material-icons" style={{ color: "#ffc107" }}>person</i> My Profile</Link></li>
        <li><Link to="/chat" className="amber-text"><i className="small material-icons" style={{ color: "#ffc107" }}>chat_bubble</i> Chat Rooms</Link></li>
        <li><a onClick={() => { logOut() }} className="amber-text"><i className="small material-icons" style={{ color: "#ffc107" }}>phonelink_erase</i> Log Out</a></li>
      </ul>

      {/* <ul id="chat-nav" className="sidenav chatnav blue-grey darken-3">
          <li>testing</li>
          <li>side</li>
          <li>nav</li>
        </ul> */}
    </nav>
  );
}

export default Nav
