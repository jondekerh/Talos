module.exports.reset = () => {
  const mongoose = require('mongoose');
  var Member = require('./schemas/memberSchema.js');

  //find any docs that may have gotten stuck on cooldown due to a crash or sudden
  //shutdown and reset them
  Member.updateMany({postCooldown: true}, {postCooldown: false}, (err, docs) => {
    if (err) {
      console.log(err);
    }
  })
};
