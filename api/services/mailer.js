const nodemailer = require('nodemailer')
exports.transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: sails.config.custom.EMAIL,
    pass: sails.config.custom.PASSWORD,
  },
});