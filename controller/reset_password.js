const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const customer = require("../Models/customer");
//This is to send the token to the email that passed in body
module.exports.sendToken = (req, res, next) => {
  const email = req.body.email;
  customer.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      user.resToken = token;
      user.resTokenExpiration = Date.now() + 3600000;
      user.save();
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ibrahimibrahim.2552001@gmail.com",
          pass: "zcdholzybchjttda",
        },
        tls: {
          rejectUnauthorized: true,
        },
      });
      const mailOptions = {
        form: "ibrahimibrahim.2552001@gmail.com",
        to: email,
        subject: "password reset",
        html: `click <a href="http://localhost:5173/reset-password/${token}">here</a> to confirm your identity to reset your password`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ err });
        } else {
          return res.status(200).json(info.response);
        }
      });
    }
  });
};
//This is to change the password and reset the token and expiration with null value
module.exports.reSetPassword = (req, res, next) => {
  const token = req.params.token;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  console.log(token, req.body);
  customer
    .findOne({
      where: { resToken: token },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      } else {
        if (password === confirmPassword) {
          bcrypt.hash(password, 10).then((hashPassword) => {
            user.password = hashPassword;
            user.resToken = null;
            user.resetTokenExpiration = null;
            user.save();
          });
          res.status(200).json("success");
        } else {
          res.status(404).json("The password is not equal confirmPassword");
        }
      }
    });
};
