import React, {useState, useEffect} from 'react';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import './App.css';
import { Avatar, AvatarWPic } from './components/Avatar';
import Chat from "./pages/chatrooms";
import Profile from "./pages/profile";
import API from './utils/API';
import UserContext from "./utils/userContext";

function App() {

  const [user, setUser ] = useState({_id:"", firstName:"", lastName:"", userName:"", email:""})
  // handle setting user after login or signup!
  
  // this here is only temporary !!! -------------
  useEffect(() => {
    API.getUsers()
    .then( data => {setUser(data.data[1])})
  }, [])
  //  this here is only temporary !!! -------------

  return (
    <UserContext.Provider value={{ user}}>

      <div className="App">

        <div className="teal lighten-2">
          <h1>Header - Dice Rollers FTW!</h1>
        </div>

  <div>Hello, {user.userName}</div>

        <BrowserRouter>
          <Switch>
            <Route exact path={["/","/login"]}>
              <div>Must add login page here!</div>
            </Route>
            <Route exact path={"/chat"}>
              <Chat/>
            </Route>
            <Route exact path={"/profile"}>
              <Profile/>
            </Route>
            
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;


// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Dice Rollers FTW!</h1>
//     </div>
//   );
// }

// export default App;
