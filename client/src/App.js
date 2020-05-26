import React from 'react';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import './App.css';
import { Avatar, AvatarWPic } from './components/Avatar';
import Chat from "./pages/chatrooms";
import Profile from "./pages/profile";
import Login from "./pages/Login/login";

function App() {
  return (
    <div className="App">

      <div className="teal lighten-2">
        <h1>Header - Dice Rollers FTW!</h1>
      </div>

      <BrowserRouter>
        <Switch>
          <Route exact path={["/","/login"]}>
            <Login></Login>
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
