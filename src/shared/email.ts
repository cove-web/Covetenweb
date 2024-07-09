import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  // Configure the email transport using your SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
      user: 'contact.coveten@gmail.com', // Your email address
      pass: 'cnji hvag lpze qywi', // Your email password or an application-specific password
    },
  });

  // Define the email options
  const mailOptions: nodemailer.SendMailOptions = {
    from: 'contact.coveten@gmail.com', // Sender's email address
    to, // Recipient's email address
    subject, // Email subject
    html, // HTML content of the email
    replyTo: ''
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);
}

export { sendEmail };