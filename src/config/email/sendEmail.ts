import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    pass: process.env.GOOGLE_APP_SECRET!,
    user: process.env.GOOGLE_EMAIL_USER!,
  },
});

export const sendMail = async (mailOptions: Mail.Options) =>
  await transporter.sendMail({
    ...mailOptions,
    from: process.env.GOOGLE_EMAIL_USER,
  });
