const Follow = require('../models/followModels');
const Notification = require('../models/notificationModels.js');

// When new content is posted, send notifications to matching users
const sendNotifications = async (req, res) => {
  const { keywords, message } = req.body;

  if (!keywords || !message) {
    return res.status(400).json({ error: 'keywords and message are required' });
  }

  try {
    const matchingFollows = await Follow.find({
      keywords: { $in: keywords }
    });

    const notifiedUsers = [];

    for (const follow of matchingFollows) {
      let userNotif = await Notification.findOne({ userId: follow.userId });

      if (!userNotif) {
        userNotif = new Notification({
          userId: follow.userId,
          messages: [message]
        });
      } else {
        userNotif.messages.push(message);
      }

      await userNotif.save();
      notifiedUsers.push(follow.userId);
    }

    res.status(200).json({ message: 'Notifications sent', notifiedUsers });
  } catch (error) {
    console.error('sendNotifications error:', error);
    res.status(500).json({ error: error.message });
  }
};

// View notifications for a user
const getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notif = await Notification.findOne({ userId });

    if (!notif) {
      return res.status(404).json({ error: 'No notifications found' });
    }

    res.status(200).json({ notifications: notif.messages });
  } catch (error) {
    console.error('getUserNotifications error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendNotifications, getUserNotifications };
