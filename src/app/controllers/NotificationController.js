import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index() {
    const { provider_id } = req.body;

    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });
    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'You can only see notifications if you are a provider'
      });
    }

    const notifications = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id)

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true
      },
      { new: true }
    );

    return res.json(notification);
  }
}
export default new NotificationController();
