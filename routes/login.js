'use strict';

let express = require('express');
let router = express.Router();

let Person = require('../models/person');

router.post('/', (req, res) => {
  Person.findOne({name: req.body.user}, (err, person) => {
    if (err) {
      res.status(400).send(err);
    }
    else if (!person) {
      let person = new Person();
      person.name = req.body.user;
      person.pass = req.body.pass;
      console.log('Adding new person: ', person.name);
      person.save((err, person) => {
        if (err) {
          res.status(400).send(err);
        }
        else {
          res.json(person);
        }
      });
    }
    else if (person.pass === req.body.pass) {
      res.send(person);
    }
    else {
      res.status(401).send('');
    }
  });
});

module.exports = router;
