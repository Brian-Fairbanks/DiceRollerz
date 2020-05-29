// State Dependencies
import React, { useState, useEffect } from 'react';
import API from './utils/API';
import store from "./store";
import { Provider } from "react-redux";

//Routing Dependencies
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from "./components/Private-Route";

// Authentication Dependencies
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Styling Dependencies
import M from  'materialize-css/dist/js/materialize.min.js';
import './App.css';

//Page Dependencies
import NavBar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Landing from "./pages/landing"
import SignUp from './pages/SignUp/signup';
import Login from './pages/Login/LoginTest';
import Chat from './pages/chatrooms';
import Profile from './pages/profile';
import Dashboard from "./components/Dashboard";



/* ###############################################################
User Persistant Sign In / set up redux/store with user information
################################################################*/
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in seconds instead of miliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


document.addEventListener('DOMContentLoaded', function() {
  let sidenav = document.querySelector('.sidenav');
  M.Sidenav.init(sidenav, {});
})

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
  // handle setting user after login or signup!

  // this here is only temporary !!! -------------
  useEffect(() => {
    API.getUsers().then((data) => {
      setUser(data.data[0])
    })
  }, [])
  //  this here is only temporary !!! -------------
  //    <UserContext.Provider value={{ user }}> replacing this line with provider store

  return (
    <Provider store={store}>>
      {/* <div className='App'>
        <div className='red darken-4'> */}
      {/* <div className="App">

        <div className="teal lighten-2">
          <h1>Header - Dice Rollers FTW!</h1>
          <div>Hello, {user.userName}</div>
        </div> */}
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path={"/"}>
              <main>
                <Landing />
              </main>
              <Footer />
            </Route>
            <Route exact path="/login" component={Login}>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
              <main>
                <Login/>
              </main>
              <Footer />
            </Route>
            <PrivateRoute exact path='/chat'>
              <main>
                <Chat />
              </main>
            </PrivateRoute>
            <Route exact path='/profile'>
              <main>
                <Profile />
              </main>
              <Footer />
            </Route>
            <Route exact path="/signup">
              <main>
                <SignUp />
              </main>
              <Footer />
            </Route>
          </Switch>
        </BrowserRouter>
    </Provider>
  )
}

export default App
