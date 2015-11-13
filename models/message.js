
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'persons'},
    text: {type: String, required: true},
    replies: [{type: Schema.Types.ObjectId, ref: 'messages'}],
    updated: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('messages', messageSchema);
