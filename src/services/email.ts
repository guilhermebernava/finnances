const nodemailer = require("nodemailer");

//function que vai enviar email
const sendEmail = async (user: any, link: string) => {
  //TEST
  // const testAccount = await nodemailer.createTestAccount();

  //cria o metodo TRANSPORTER que vai enviar o email
  //precisar configurar ele com esses dados
  const transporter = nodemailer.createTransport({
    //qual servico vai usar
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    //conta que vai ser usada para enviar esses EMAILS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true
  });

  //aqui de fato está enviando o EMAIL nesse formato
  await transporter.sendMail({
    from: ' "My Finnances" <noreply@myfinnances.com>',
    to: user.email,
    subject: "Email Verification",
    text: "Hello! I am your email verification!",
    html: `<h1>Hello!</h1> <p>access this link to verify your email!</p> <br/> <a href="${link}">${link}</a>`,
  });
};

const resetPassword = async (email: string, link: string) => {
  //TEST
  // const testAccount = await nodemailer.createTestAccount();

  //cria o metodo TRANSPORTER que vai enviar o email
  //precisar configurar ele com esses dados
  const transporter = nodemailer.createTransport({
    //qual servico vai usar
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    //conta que vai ser usada para enviar esses EMAILS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true
  });

  //aqui de fato está enviando o EMAIL nesse formato
  await transporter.sendMail({
    from: ' "My Finnances" <noreply@myfinnances.com>',
    to: email,
    subject: "Email Verification",
    text: "Hello! I am your email verification!",
    html: `<h1>Hello!</h1> <p>access this link to reset your password!</p> <br/> <a href="${link}">${link}</a>`,
  });
};

export { sendEmail, resetPassword };
