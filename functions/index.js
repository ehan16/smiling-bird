const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
require("dotenv").config();
admin.initializeApp();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

let transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "smiling.bird.clinic@gmail.com",
    pass: "bziyokcbfovbqhtu"
  }
});

exports.mail = functions.firestore
  .document("alreadymademail/{id}")
  .onCreate((snap, context) => {
    const email = snap.data().email;
    const title = snap.data().title;
    const message = snap.data().message;
    console.log(snap.data());
    transport
      .sendMail({
        from: "smiling.bird.clinic@gmail.com",
        to: email,
        subject: title,
        text: message
      })
      .then(r => console.log(r))
      .catch(e => console.log(e));
    return null;
  });
