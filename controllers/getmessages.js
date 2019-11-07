const Message = require('../database/models/Message')

module.exports = async (req, res) => {
  const messages = await Message.find({}).sort({_id:-1}).populate('author');

  res.render("allmessages", {
    messages
  });
}