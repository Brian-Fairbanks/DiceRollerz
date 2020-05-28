import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Chat from './pages/chatrooms';
import Profile from './pages/profile';
import API from './utils/API';
import UserContext from './utils/userContext';
import NavBar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Landing from "./pages/landing"
//import Login from "./pages/Login/login";
import SignUp from './pages/SignUp/signup';
import Login from './pages/Login/logintest.js';
import store from "./store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";





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
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

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
    <Provider store={store}>
    {/* // <UserContext.Provider value={{ user }}> */}
     
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
                <Login />
              </main>
              <Footer />
            </Route>
            <PrivateRoute exact path='/chat' component= {<Chat />} />
              <main>
                {/* <Chat /> */}
              </main>
            {/* </Route> */}
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
    {/* </UserContext.Provider> */}
    </Provider>
  )
}

export default App
