const Chat = require('../../models/Chat');

exports.chats = async (req, res) => {
  const chats = await Chat.find({
    members: {
      $elemMatch: req.user.id
    }
  }).populate('members').exec();
  res.status(200).json({
    chats
  });
};
