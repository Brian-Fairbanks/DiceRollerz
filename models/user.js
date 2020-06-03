const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const profileImage = "https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg?quality=90&auto=webp"


const userSchema = new Schema({
  username:{
    type: String,
    trim:true,
    unique:true,
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
  },
    tagLine: {
      type: String
    },
    status: {
      type: String
    },
    image: {type: String,
      default: profileImage}   
});


var User = mongoose.model('User' , userSchema);
module.exports = User;
