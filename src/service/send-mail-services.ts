import HttpException from "../utils/http-exception";
import { mail_template } from "../utils/mail-template";
import nodemailer from "nodemailer";

const sendMailVerification = async ({
  email,
  name,
  id,
}: {
  email: string;
  name: string;
  id: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL as string,
      pass: process.env.PASSWORD_MAIL as string,
    },
  });

  const mailsend = await transporter.sendMail({
    from: process.env.USER_MAIL as string,
    to: `${email as string}`,
    subject: "Vericification Mail From Space world",
    text: `Hello ${name},\n\nThis is verification mail.`,
    html: mail_template({ name, id }),
  });

  if (!mailsend) throw new HttpException(500, "Error sending mail");

  return mailsend;
};

export default sendMailVerification;
