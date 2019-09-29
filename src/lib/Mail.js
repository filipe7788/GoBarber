import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mail from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mail;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null
    });

    this.configureTemplates();
  }
  configureTemplates() {
    const viewPaths = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPaths, 'layouts'),
          partialsDir: resolve(viewPaths, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPaths,
        extname: '.hbs'
      })
    );
  }
  sendMail(message) {
    return this.transporter.sendMail({
      ...mail.default,
      ...message
    });
  }
}

export default new Mail();
