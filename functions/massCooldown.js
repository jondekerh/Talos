module.exports.reset = () {
  const mongoose = require('mongoose');
  var Member = require('./schemas/memberSchema.js');

  //find most efficient way of going through all the member docs and resetting cooldowns literally member.findAndUpdate?
};
