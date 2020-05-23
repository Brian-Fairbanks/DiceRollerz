const express = require("express");
// const http = require('http').createServer(app);

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();


const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Rollerz");


//Instance of Socket IO Listening
var http = require('http').createServer(app);
var io = require('socket.io')(http)

io.on('connection', (socket) => {
  //connection
  console.log('a user connected');
  
  // disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // chat message
  socket.on('chatMessage', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit("newMessage", msg);
  });
});


// Start the API server
http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
