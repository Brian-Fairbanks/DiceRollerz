import React, { useState, useEffect, useContext, useReducer } from "react";
import './profile.css';
import UserContext from "../utils/userContext";
import API from "../utils/API.js";

import { Avatar, AvatarWPic } from '../components/Avatar';
import { Input, InputWIcon } from '../components/Input';
import { Textarea, TextareaWIcon } from '../components/TextArea';
import { Button, FloatingButton, SubmitButton } from '../components/Button';

function Profile() {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({userName: "", firstName: "", lastName: "", email: ""})

  useEffect(() => {
    setCurrentUser(user);
  }, [user])  

  const changeHandler = event => {
    const { id, value } = event.target;
    let newUser = { ...currentUser };
    let originalValue;
    switch (id) {
      case "user-name":
        newUser.userName = value;
        originalValue = user.userName;
        break;
      case "first-name":
        newUser.firstName = value;
        originalValue = user.firstName;
        break;
      case "last-name":
        newUser.lastName = value;
        originalValue = user.lastName;
        break;
      case "email":
        newUser.email = value;
        originalValue = user.email;
        break;
      case "description":
        // newUser.description = event.target.value;
        // originalValue = user.description;
        // break;
      default:
        return;
    }
    setCurrentUser(newUser);
    // if (value === originalValue) {
    //   event.target.className = "validate";
    // } else {
    //   event.target.className = "validate red-text";
    // }
  }

  const clickHandler = event => {
    event.preventDefault();
    console.log("Submit button Clicked!");

    let userChanges = {};
    if (currentUser.userName !== user.userName) {
      userChanges.userName = currentUser.userName;

    }
    if (currentUser.firstName !== user.firstName) {
      userChanges.firstName = currentUser.firstName;
    }
    if (currentUser.lastName !== user.lastName) {
      userChanges.lastName = currentUser.lastName;
    }
    if (currentUser.email !== user.email) {
      userChanges.email = currentUser.email;
    }

    if (userChanges !== {}) {
      userChanges._id = user._id;
      API.updateUser(userChanges);
    }
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col s12">
          <form className="container">
            
            <Avatar>
                <AvatarWPic
                    imagePath="https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg?quality=90&auto=webp"
                    imageHeight="50px"
                    altText="Red Dot"
                    title="HAL 9000"
                    text={["I'm sorry, Dave", "I'm afraid I can't do that."]}
                    href="#"
                    key="0"
                />
            </Avatar>
              
            <InputWIcon
                id="user-name"
                name="userName"
                icon="person"
                label="User Name"
                placeholder="User Name"
                type="text"
                isRequired={true}
                value={currentUser.userName}
                onChange={changeHandler}
                inputClass={(currentUser.userName === user.userName) ? "validate" : "validate red-text"}
              />
              <InputWIcon
                id="first-name"
                name="firstName"
                icon=""
                label="First Name"
                placeholder="First Name"
                type="text"
                value={currentUser.firstName}
                onChange={changeHandler}
                inputClass={(currentUser.firstName === user.firstName) ? "validate" : "validate red-text"}
              />
              <InputWIcon
                id="last-name"
                name="lastName"
                icon=""
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={currentUser.lastName}
                onChange={changeHandler}
                inputClass={(currentUser.lastName === user.lastName) ? "validate" : "validate red-text"}
              />
              <InputWIcon
                id="email"
                name="email"
                icon="email"
                label="Email"
                placeholder="Email"
                type="email"
                isRequired={true}
                value={currentUser.email}
                onChange={changeHandler}
                inputClass={(currentUser.email === user.email) ? "validate" : "validate red-text"}
              />
              <TextareaWIcon
                id="description"
                name="desc"
                icon=""
                label="About Me"
                value={currentUser.description}
                isDisabled={true}
                onChange={changeHandler}
                areaClass={(currentUser.description === user.description) ? "validate" : "validate red-text"}
              />

              <SubmitButton 
                id="submit-button"
                name="profile-form"
                icon=""
                text="Save Changes"
                onClick={clickHandler}
                isDisabled={currentUser !== user}
              />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
