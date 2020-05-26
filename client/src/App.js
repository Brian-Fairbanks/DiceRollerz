import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
// import { Avatar, AvatarWPic } from './components/Avatar';
import Chat from './pages/chatrooms';
import Profile from './pages/profile';
import API from './utils/API';
import UserContext from './utils/userContext';
import NavBar from './components/Navbar';
import Footer from './components/Footer/Footer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import TypoGraphy from '@material-ui/core/Typography';


function App () {
  return (
    /* <AppBar>
          <Toolbar>
            <TypoGraphy variant="title" color="inherit">
              My header
            </TypoGraphy>
          </Toolbar>
        </AppBar>
        <br></br> */
    <div className='App'>
      <NavBar />
      <Footer />
    </div>
  )
}

function Appfxn () {
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
      <div className='App'>
        <div className='red darken-4'>
          <h1>Header - Dice Rollers FTW!</h1>
          <div>Hello, {user.userName}</div>
        </div>

        <BrowserRouter>
          <Switch>
            <Route exact path={['/', '/login']}>
              <div>Must add login page here!</div>
            </Route>
            <Route exact path='/chat'>
              <Chat />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  )
}

export default App
