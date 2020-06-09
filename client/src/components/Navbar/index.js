import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./DRZ.png";
import userContext from "../../utils/userContext";
import block from "material-ui/svg-icons/content/block";


function Nav(props) {
  const { setUser, setToken, token } = useContext(userContext);

  const { M } = props;

  document.addEventListener('DOMContentLoaded', function () {
    let sidenav = document.querySelector('.sidenav.fullnav');
    console.log(sidenav);
    M.Sidenav.init(sidenav, {});
  })

  // User Signed In?
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (token && token !== "NotSet" && token !== "NotValid") {
      setValidated(true);
    }
    else{
      setValidated(false);
    }
  }, [token])


  // Log Out Functionality
  // ========================

  function logOut() {
    console.log("Logging out!");
    localStorage.removeItem("jwtToken");
    setUser({
      _id: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: ''
    });
    setToken("NotValid");
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
            {validated ? (
              <>
                <li><Link to="/profile" title="My Profile"><i className="small material-icons">person</i></Link></li>
                <li><Link to="/chat" title="Chat Rooms"><i className="small material-icons">chat_bubble</i></Link></li>
                <li><a onClick={() => { logOut() }}><i className="small material-icons">phonelink_erase</i></a></li>
              </>
            ) : 
            (
              <>
                <li><i className="small material-icons disabled-nav-icon">person</i></li>
                <li><i className="small material-icons disabled-nav-icon">chat_bubble</i></li>
                <li><i className="small material-icons disabled-nav-icon">phonelink_erase</i></li>
              </>
            )}
          </ul>
        </div>

      </div>

      <ul id="nav-mobile" className="sidenav fullnav blue-grey darken-3">
        <li><Link to="/" className="amber-text"><i className="material-icons" style={{ color: "#ffc107" }}>home</i>Home</Link></li>
        {validated ? (
          <>
            <li><Link to="/profile" className="amber-text"><i className="small material-icons" style={{ color: "#ffc107" }}>person</i> My Profile</Link></li>
            <li><Link to="/chat" className="amber-text"><i className="small material-icons" style={{ color: "#ffc107" }}>chat_bubble</i> Chat Rooms</Link></li>
            <li><a onClick={() => { logOut() }} className="amber-text"><i className="small material-icons" style={{ color: "#ffc107" }}>phonelink_erase</i> Log Out</a></li>
          </>
        ) : (
          <>
          <li><span className="amber-text flex disabled"><i className="small material-icons disabled-icon">person</i> My Profile</span></li>
            <li><span className="amber-text flex disabled"><i className="small material-icons disabled-icon">chat_bubble</i> Chat Rooms</span></li>
            <li><span className="amber-text flex disabled"><i className="small material-icons disabled-icon">phonelink_erase</i> Log Out</span></li>
          </>
        )}
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
