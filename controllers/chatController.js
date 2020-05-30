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
      const chatroom = await db.Chatroom .findById(req.params.id);
      const posts = await db.Post.find({"room":chatroom._id})
      res.json({chatroom, posts})
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
  }
};
