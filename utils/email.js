const nodemailer = require('nodemailer');

const from = 'info@algoritmuspizza.pizza';

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

exports.send = async (subject, text, to) => {
  const mailOptions = {
    from,
    to,
    subject,
    text
  };
  const transporter = await createTransporter();
  transporter.sendMail(mailOptions);
};
