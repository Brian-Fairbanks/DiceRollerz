const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findAll: function(req, res) {
    db.Chatroom
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: async function(req, res) {
    try{
      // get chatroom data
      const chatroom = await db.Chatroom .findById(req.params.id);
      // get all associated posts
      const posts = await db.Post.find({"room":chatroom._id})
      // get user information
      const userData = await Promise.all(chatroom.members.map( async function (member){
        const user = await db.User.findOne({_id:member.user});
        const useImage = member.image?member.image:user.image; 
        const useName = member.name?member.name:user.username; 
        return(
          {_id:member._id, user:member.user, role:member.role, username:useName, image:useImage}
          );
      }))
      res.json({chatroom:{
        __v:chatroom.__v,
        _id:chatroom._id,
        gameMode:chatroom.gameMode,
        name: chatroom.name,
        lastMessage:chatroom.lastMessage,
        members:userData}, posts})
    }catch (err){
      res.status(422).json(err)
    };
  },

  create: function(req, res) {
    db.Chatroom
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Chatroom
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
};


/*
  Helper functions
  ================
 */