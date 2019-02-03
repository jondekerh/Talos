const mongoose = require('mongoose');

var guildSchema = new mongoose.Schema({
  guildID: {
    type: String,
    validate: {
      isAsync: true,
      validator: function(id, isValid) {
        const self = this;
        return self.constructor.findOne({guildID: id})
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else if (doc) {
            if (self.guildID === doc.guildID) {
              return isValid(false);
            };
            return isValid(true);
          } else {
            return isValid(true);
          }
        })
      },
      message: 'This guild has already been initialized.'
    }
  },
  botChannel: String,
  greetingChannel: String,
  rulesChannel: String
});

module.exports = mongoose.model('Guild', guildSchema);
