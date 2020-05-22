import React from 'react';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import './App.css';
<<<<<<< HEAD
import { Textarea, TextareaWIcon } from './components/TextArea';
=======
import { Avatar, AvatarWPic } from './components/Avatar';
import Chat from "./pages/chatrooms";
import Profile from "./pages/profile";
>>>>>>> master

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <h1>Dice Rollers FTW!</h1>

      
      
=======

      <div className="teal lighten-2">
        <h1>Header - Dice Rollers FTW!</h1>
      </div>

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
>>>>>>> master
    </div>
  );
}

export default App;



        // <Avatar>
        //   <AvatarWPic
        //     imagePath="https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg?quality=90&auto=webp"
        //     imageHeight="50px"
        //     altText="Red Dot"
        //     title="HAL 9000"
        //     text={["I'm sorry, Dave", "I'm afraid I can't do that."]}
        //     href="#"
        //     key="1"
        //   />
        // </Avatar>
        


{/* <div className="container">
  <Input 
    // id=""
    // type=""
    colSize="s12"
    placeholder="Hello World!"
    label="Test"
  />
</div> */}

{/* <InputWIcon
id="test"
// type=""
icon="sms"
colSize="s12"
placeholder="Hello World!"
label="Test"
/> */}

{/* <Textarea
id="test"
icon="sms"
colSize="s12"
placeholder="Hello World!"
label="Test"
/> */}

{/* <Textarea
  id="test"
  colSize="s12"
  placeholder="Hello World!"
  label="Test"
/> */}