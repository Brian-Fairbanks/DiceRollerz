// State Dependencies
import React, { useState, useEffect } from 'react';
import API from './utils/API';
import UserContext from './utils/userContext';

//Routing Dependencies
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Authenticate from "./components/Private-Route";

// Authentication Dependencies
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Styling Dependencies
import M from  'materialize-css/dist/js/materialize.min.js';
import './App.css';

//Page Dependencies
import NavBar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Landing from "./pages/Landing"
import SignUp from './pages/SignUp/signup';
import Login from './pages/Login/LoginTest';
import Chat from './pages/Chatrooms';
import Profile from './pages/profile';

import { ParallaxProvider } from 'react-scroll-parallax';


// document.addEventListener('DOMContentLoaded', function() {
//   let sidenav = document.querySelector('.sidenav.fullnav');
//   M.Sidenav.init(sidenav, {});
// })

// M.AutoInit();

/* ###############################################################
App Render
################################################################*/
function App () {
  const [user, setUser] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: ''
  })

  const [token, setToken] = useState("NotSet");

  /* ###############################################################
  User Persistant Sign In / set up redux/store with user information
  ################################################################*/
  useEffect(() => {
  // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      signIn();
    }
    else{
      setToken("NotValid")
    }
  }, [token])

  async function signIn(){
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      setToken(token)
      const userData = await API.getUser(decoded.id)
      setUser(userData.data);
    // Check for expired token
      const currentTime = Date.now() / 1000; // to get in seconds instead of miliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        setUser({
          _id: '',
          firstName: '',
          lastName: '',
          userName: '',
          email: ''
        });
        setToken("NotValid");
        // Redirect to login
        window.location.href = "./login";
      }
  }

  // // handle setting user after login or signup!

  // // this here is only temporary !!! -------------
  // useEffect(() => {
  //   API.getUsers().then((data) => {
  //     setUser(data.data[0])
  //   })
  // }, [])
  // //  this here is only temporary !!! -------------
  // //    <UserContext.Provider value={{ user }}> replacing this line with provider store

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken}}>
      <ParallaxProvider>
      {/* <div className='App'>
        <div className='red darken-4'> */}
      {/* <div className="App">

        <div className="teal lighten-2">
          <h1>Header - Dice Rollers FTW!</h1>
          <div>Hello, {user.userName}</div>
        </div> */}
        <BrowserRouter>
          <NavBar M={M} />
          <Switch>
            <Route exact path={"/"}>
              <main>
                <Landing />
              </main>
              <Footer />
            </Route>
            <Route exact path="/login" component={Login}>
              <main>
                {/* This page is done as a class extending component, and cannot make use of the useContext hook */}
                <UserContext.Consumer>
                  {ctx => <Login 
                    setToken={ctx.setToken}
                    user={ctx.user}
                  />}
                </UserContext.Consumer>
              </main>
              <Footer />
            </Route>
            <Route exact path="/signup">
              <main>
                <SignUp />
              </main>
              <Footer />
            </Route>
            <Route exact path='/chat'>
              <Authenticate/>
              <main>
                <Chat 
                  M={M}
                />
              </main>
            </Route>
            <Route exact path='/profile'>
              <Authenticate/>
              <main>
                <Profile />
              </main>
              <Footer />
            </Route>
            {/* Default Route, when not valid */}
            <main>
                <Landing />
              </main>
              <Footer />
          </Switch>
        </BrowserRouter>
      </ParallaxProvider>
    </UserContext.Provider>
  )
}

export default App
