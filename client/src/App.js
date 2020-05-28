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
import Login from "./pages/Login/login";
import SignUp from './pages/SignUp/signup';
import M from  'materialize-css/dist/js/materialize.min.js';

document.addEventListener('DOMContentLoaded', function() {
  let sidenav = document.querySelector('.sidenav');
  M.Sidenav.init(sidenav, {});
})

// M.AutoInit();

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

  return (
    <UserContext.Provider value={{ user }}>
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
            <Route exact path={"/login"}>
              <main>
                <Login />
              </main>
              <Footer />
            </Route>
            <Route exact path='/chat'>
              <main>
                <Chat />
              </main>
            </Route>
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
    </UserContext.Provider>
  )
}

export default App
