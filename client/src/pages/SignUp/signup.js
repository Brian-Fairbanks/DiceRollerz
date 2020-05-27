import React from "react";
import "./signup.css"
import { Container } from "../../components/Grid";
import {Link} from "react-router-dom"


const mongoose= require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username:{
    type: String,
    trim:true,
    required:"Username is Required"
  },
  password:{
    type: String,
    trim: true,
    required:"Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer"]
  },
  email:{
    type: String,
    unique:true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"] 
  },
  firstName: {
    type: String,
    trim: true,
    match:[/^[a-zA-Z0-9]+$/, 'is invalid'],
    required: "First Name is required",
  },
  lastName: {
    type: String,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    required: "Last Name is required"
  }
});

// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }

var User = mongoose.model('user' , userSchema);

function SignUp() {
return(
<Container>
  <div class="row center center-align">
    <div class="col s12 m7 xl10">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <input placeholder="Username" id="username" type="text" className="white-text"></input>
          <input placeholder="Password" id="password" type="text" className="white-text"></input>
          <input placeholder="Email" id="email" type="email" className="white-text"></input>
          <input placeholder="First Name" id="firstName" type="text" className="white-text"></input>
          <input placeholder="Last Name" id="lastName" type="text" className="white-text"></input>
        </div>
        <div class="card-action">
        <a className="waves-effect waves-light btn red accent" href="/chat">Sign Up</a>
        <Link to= "/login"className="waves-effect waves-light btn red accent">Log In</Link>
        </div>
      </div>
    </div>
  </div>
</Container>
)
}

export default SignUp