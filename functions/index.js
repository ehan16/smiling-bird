const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const Functions = require('firebase-functions')
const admin=require('firebase-admin')
const nodemailer = require('nodemailer');

admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

exports.sendEmailNotification=funtion.firestore.document('submissions/{docId}')
onabort.Create((snap,ctx)=>{
    const data=snap.data();

    let autData=nodemailer.createTransport({
        host:'smtp/gmail.com',
        port:465,
        secure:true,
        auth:{
            user:SENDER_EMAIL,
            pass:SENDER_PASSWORD
        }
    });
    autData.sendMail({
        from :'e.han@correo.unimet.edu.ve',
        to: `${data.email}`,
        subject:'vamoh a probah esto',
        text: `${data.email}`,
        html: `${data.email}`,
    }).then(res=>console.log('se mando')).catch(err=>console.log(err));

});
