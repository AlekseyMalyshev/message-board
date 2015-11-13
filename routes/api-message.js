'use strict';

let express = require('express');
let router = express.Router();

let Message = require('../models/message');

let checkError = (err, res, message) => {
  if (err) {
    console.log('err: ', err);
    res.status(400).send(err);
  }
  else {
    res.json(message);
  }
}

router.post('/', (req, res) => {
  let message = new Message(req.body);
  console.log('Adding message: ', message);
  message.save((err, message) => {
    checkError(err, res, message);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  console.log('Retrieving message: ', id);
  Message.findOne({_id: id}, (err, message) => {
    checkError(err, res, message);
  });
});

router.get('/', (req, res) => {
  console.log('Reading all messages');
  Message.find((err, messages) => {
    checkError(err, res, messages);
  });
});

router.put('/', (req, res) => {
  let message = req.body;
  console.log('Updating message: ', message);
  Message.findByIdAndUpdate({_id: message._id}, message, (err) => {
    checkError(err, res, {response: 'message updated.'});
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  console.log('Deleting message: ', id);
  Message.findOneAndRemove({_id: id}, (err, message) => {
    checkError(err, res, {response: 'message deleted.'});
  });
});

module.exports = router;
