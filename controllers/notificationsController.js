
const databases = require("../config/databases");

const getUnReadNotifications = async (req, res) => {
  try {
    let notifications = await databases.notifications.findAll({
      where: { isRead: false },
      raw: true
    });

    if (notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        notifications[i]._student = "YSR24" + notifications[i]._student;
      }
    }
    return res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const totalUnreadNotifications = async (req, res) => {
  try {
    const totalNotifications = await databases.notifications.count({
      where: { isRead: false }
    });

    return res.status(200).json({
      success: true,
      data: totalNotifications || 0
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const readNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    let read = await databases.notifications.update(
      { isRead: true },
      { where: { id: id } }
    );
    if (read) {
      return res.status(200).json({
        success: true,
        message: "message read successfully"
      });
    }
    return res.status(404).json({
      success: "Something went wrong"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    let notifications = await databases.notifications.findAll({ raw: true });
    if (notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        notifications[i]._student = "YSR24" + notifications[i]._student;
      }
    }
    return res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await databases.notifications.findOne({
      where: { id: id }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found with this ID"
      });
    }

    const deletedCount = await databases.notifications.destroy({
      where: { id: id }
    });

    if (deletedCount) {
      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully"
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to delete the notification"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUnReadNotifications,
  readNotificationById,
  getAllNotifications,
  removeNotificationById,
  totalUnreadNotifications
};
