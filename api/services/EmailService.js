const { transport } = require("./mailer");
exports.sendConfirmationEmail = (username, email, confirmationCode) => {
  transport.sendMail({
    from: sails.config.custom.EMAIL,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for registering :) Please confirm your email by clicking on the following link</p>
          <a href=${sails.config.custom.SERVER}/api/v1/user/confirm/${confirmationCode}> Click here</a>
          </div>`,
  });
};

exports.passwordRecoveryEmail = (username, email, confirmationCode) => {
  transport.sendMail({
    from: sails.config.custom.EMAIL,
    to: email,
    subject: "Please recover your password",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Password recovery :) Please confirm your email by clicking on the following link</p>
          <a href=${sails.config.custom.SERVER}/api/v1/user/reset-password/${confirmationCode}> Click here</a>
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
