const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findAll: function(req, res) {
    db.Post
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Post
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: async function(req, res) {
    console.log("Creating Post")
    console.log(req.body);
    req.body.body = await checkCommands(req.body.body);
    db.Post
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: async function(req, res) {
    req.body.body = await checkCommands(req.body.body);
    db.Post
      .findOneAndUpdate({ _id: req.params.id }, { ...req.body,  updated:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


/* Helper Functions
================================= */

async function checkCommands(msg){
  // return msg as it is
  if(msg[0] !== "/"){
    return msg;
  }
  args = msg.split(" ");

  const command = args[0].substring(1).toLowerCase();

  switch(command){
    case "roll":
      return msg+` - ${await roll(args)}`;
      break
    default:
      return msg+` - ${command} is not a valid /command`;
  }
}

// Roll Command
async function roll(args){
  return "Rolling"
}

