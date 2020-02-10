const nodemailer = require("nodemailer");

const sendEmail = async options => {
  console.log("i am in mail");
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  console.log("created");
  const mailOptions = {
    from: "admin <admin@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  console.log("Message sent: %s");
};

module.exports = sendEmail;
