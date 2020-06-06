const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  seenMessage: async function (req, res) {
    try {
      const data = await setSeen(req.body)
      // console.log(data);
      res.json(data);
    }
    catch (err) { res.status(422).json(err); }
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


/*=============================================
  Helper Functions 
=============================================== */
async function setSeen(msg) {
  const upd = await db.User.update(
    { _id: msg.user,
      "seenMessages.room": msg.room
    },
    { $set: { "seenMessages.$": {
      room:msg.room,
      message:msg.message,
      timeStamp:msg.timestamp
    }}}
  );

  if(upd.nModified == 0){
    const push = await db.User.update(
      { _id: msg.user,
      },
      { $push: { seenMessages: {
        room:msg.room,
        message:msg.message,
        timeStamp:msg.timestamp
      }}}
    );
  }
  return "set Recently Seen";
}