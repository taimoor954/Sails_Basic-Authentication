const { transport } = require("./mailer");
console.log(sails.config.custom.EMAIL);
console.log(sails.config.custom.PASSWORD);
     exports.sendConfirmationEmail = (
      username,
      email,
      confirmationCode
    )=> {
      transport.sendMail({
        from: sails.config.custom.EMAIL,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for registering :) Please confirm your email by clicking on the following link</p>
          <a href=${sails.config.custom.SERVER}/api/users/confirm/${confirmationCode}> Click here</a>
          </div>`,
      });
    };
  
  













// import nodemailer from "nodemailer";
// export const transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: sails.config.custom.EMAIL,
//       pass: sails.config.custom.PASSWORD,
//     },
//   });
  