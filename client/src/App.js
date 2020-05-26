import React, {useState, useEffect} from 'react';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import './App.css';
import { Textarea, TextareaWIcon } from './components/TextArea';
import { Avatar, AvatarWPic } from './components/Avatar';
import Chat from "./pages/chatrooms";
import Profile from "./pages/profile";
import API from './utils/API';
import UserContext from "./utils/userContext";
<<<<<<< HEAD
import Landing from "./pages/landing"
=======
import Login from "./pages/Login/login";
>>>>>>> c71070a25714f77200b2f959466c39154321d41a

function App() {

  const [user, setUser ] = useState({_id:"", firstName:"", lastName:"", userName:"", email:""})
  // handle setting user after login or signup!
  
  // this here is only temporary !!! -------------
  useEffect(() => {
    API.getUsers()
    .then( data => {setUser(data.data[0])})
  }, [])
  //  this here is only temporary !!! -------------

  return (
    <UserContext.Provider value={{ user}}>

      {/* <div className="App">

        <div className="teal lighten-2">
          <h1>Header - Dice Rollers FTW!</h1>
          <div>Hello, {user.userName}</div>
        </div> */}


        <BrowserRouter>
          <Switch>
            <Route exact path={["/","/login"]}>
<<<<<<< HEAD
              <Landing />
=======
              <div>Must add login page here!</div>
              <Login></Login>
>>>>>>> c71070a25714f77200b2f959466c39154321d41a
            </Route>
            <Route exact path={"/chat"}>
              <Chat/>
            </Route>
            <Route exact path={"/profile"}>
              <Profile/>
            </Route>
            
          </Switch>
        </BrowserRouter>
      {/* </div> */}
    </UserContext.Provider>
  );
}

export default App;
