const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const admin = require('firebase-admin');
admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD} = process.env;

 exports.sendEmailNotification = functions.firestore.document('alreadymademail/{docId}').onCreate((snap,ctx)=>{
     const data = snap.data();
     console.log('data', data);

     let autData=nodemailer.createTransport({
         host:'smtp/gmail.com',
         port:465,
         secure:true,
         auth:{
             user:'smiling.bird.clinic@gmail.com',
             pass:'bziyokcbfovbqhtu'
         }
     });

     autData.sendMail({
          from :'smiling.bird.clinic@gmail.com',
          to: `${data.email}`,
          subject: `${data.title}`,
          text: `${data.message}`,
          html: `${data.message}`
     }).then(res=>console.log('Se mando')).catch(err=>console.log(err));

 });
// const transport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: 'smiling.bird.clinic@gmail.com',
//         pass: 'SmilingBirdOdiaAqui'
//     }
// })

// exports.mail = functions.firestore.document('alreadymademail/{docId}').onCreate((snap, context) => {
//         const email = snap.data().email
//         const title = snap.data().title
//         const message = snap.data().message
//         console.log(snap.data());
//         return sendMail(email, title, message)
//     });

//     function sendMail(email, title, message){
//         return transport.sendMail({
//             from: 'smiling.bird.clinic@gmail.com',
//             to: email,
//             subject: title,
//             text: message
//         })
//         .then(r => console.log(r))
//         .catch(e => console.log(e));
//     }
