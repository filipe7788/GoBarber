import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

class CancelationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd de 'MMMM', às 'H:mm:h",
          {
            locale: ptBR
          }
        )
      }
    });
    console.log('sent');
  }
}

export default new CancelationMail();
