
'use strict';

var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
    name: {type: String, required: true},
    pass: {type: String, required: true},
    updated: {type: Date, default: Date.now},
  }
);

module.exports = mongoose.model('persons', personSchema);
