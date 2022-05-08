const nodemailer = require("nodemailer");

const sendEmail = async (user: any, link: string) => {
  //TEST
  // const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true
  });

  await transporter.sendMail({
    from: ' "My Finnances" <noreply@myfinnances.com>',
    to: user.email,
    subject: "Email Verification",
    text: "Hello! I am your email verification!",
    html: `<h1>Hello!</h1> <p>access this link to verify your email!</p> <br/> <a href="${link}">${link}</a>`,
  });
};

export { sendEmail };
