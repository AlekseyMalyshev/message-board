'use strict';

let express = require('express');
let moment = require('moment');
let router = express.Router();

let Message = require('../models/message');

router.get('/', (req, res) => {
  Message.find({}, null, {sort: '-updated'})
    .populate('author')
    .populate('replies')
    .exec((err, messages) => {
    if (err) {
      res.send('');
    }
    else {
      res.render('board', {messages: messages, moment: moment});
    }
  });
});

module.exports = router;
