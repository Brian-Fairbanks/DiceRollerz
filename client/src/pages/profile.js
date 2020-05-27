import React, { useState, useEffect, useContext } from "react";
import './profile.css';
import UserContext from "../utils/userContext";
import API from "../utils/API.js";

import { Avatar, AvatarWPic } from '../components/Avatar';
import { InputWIcon } from '../components/Input';
import { TextareaWIcon } from '../components/TextArea';
import { SubmitButton } from '../components/Button';

function Profile() {
  const { user } = useContext(UserContext);
  const [primeUser, setPrimeUser] = useState({_id: "", userName: "", firstName: "", lastName: "", email: ""})
  const [currentUser, setCurrentUser] = useState({_id: "", userName: "", firstName: "", lastName: "", email: ""})

  useEffect(() => {
    //      PrimeUser tracks the current state of the Database.
    //      CurrentUser controls the form values.
    setPrimeUser(user);
    setCurrentUser(user);
  }, [user])  

  const changeHandler = event => {
    const { id, value } = event.target;
    let newUser = { ...currentUser };
    switch (id) {
      case "user-name":
        newUser.userName = value;
        break;
      case "first-name":
        newUser.firstName = value;
        break;
      case "last-name":
        newUser.lastName = value;
        break;
      case "email":
        newUser.email = value;
        break;
      case "description":
        // newUser.description = event.target.value;
        // break;
      default:
        return;
    }
    setCurrentUser(newUser);
  }

  const submitHandler = event => {
    event.preventDefault();

    let userChanges = {};
    if (currentUser.userName !== primeUser.userName) {
      userChanges.userName = currentUser.userName;

    }
    if (currentUser.firstName !== primeUser.firstName) {
      userChanges.firstName = currentUser.firstName;
    }
    if (currentUser.lastName !== primeUser.lastName) {
      userChanges.lastName = currentUser.lastName;
    }
    if (currentUser.email !== primeUser.email) {
      userChanges.email = currentUser.email;
    }
    if (currentUser.description !== primeUser.description) {
      userChanges.description = currentUser.description;
    }

    if (userChanges) {
      userChanges._id = primeUser._id;
      API.updateUser(userChanges);
      setPrimeUser(currentUser);
    }
  }

  return (
    <UserContext.Provider value={ primeUser }>
      <div className="App">
        <div className="row">
          <div className="col s12">
            <form className="container" onSubmit={submitHandler}>
              
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
                  inputClass={(currentUser.userName === primeUser.userName) ? "validate white-text" : "validate red-text"}
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
                  inputClass={(currentUser.firstName === primeUser.firstName) ? "validate white-text" : "validate red-text"}
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
                  inputClass={(currentUser.lastName === primeUser.lastName) ? "validate white-text" : "validate red-text"}
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
                  inputClass={(currentUser.email === primeUser.email) ? "validate white-text" : "validate red-text"}
                />
                <TextareaWIcon
                  id="description"
                  name="desc"
                  icon=""
                  label="About Me"
                  value={currentUser.description}
                  isDisabled={true}
                  onChange={changeHandler}
                  areaClass={(currentUser.description === primeUser.description) ? "validate white-text" : "validate red-text"}
                />

                <SubmitButton 
                  id="submit-button"
                  name="profile-form"
                  icon=""
                  text="Save Changes"
                  isDisabled={currentUser !== primeUser}
                />
            </form>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default Profile;
