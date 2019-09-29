import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'user is not a provider' });
    }

    const { date } = req.query;

    const appointments = await Appointment.findAll({ where: { date: date } });

    return res.json(appointments);
  }
}

export default new ScheduleController();
