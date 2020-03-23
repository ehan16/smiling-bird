const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

// exports.sendEmailNotification = funtion.firestore.document('alreadymademail/{docId}')
// onabort.Create((snap,ctx)=>{
//     const data=snap.data();

//     let autData=nodemailer.createTransport({
//         host:'smtp/gmail.com',
//         port:465,
//         secure:true,
//         auth:{
//             user:SENDER_EMAIL,
//             pass:SENDER_PASSWORD
//         }
//     });
//     autData.sendMail({
//          from :'smiling.bird.clinic@gmail.com',
//         // to:
//         // subject:
//         // text:
//         // html:
//     }).then(res=>console.log('se mando')).catch(err=>console.log(err));

// });
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'smiling.bird.clinic@gmail.com',
        pass: 'SmilingBirdOdiaAqui'
    }
})

exports.mail = functions.firestore.document('alreadymademail/{docId}').onCreate((snap, context) => {
        const email = snap.data().email
        const title = snap.data().title
        const message = snap.data().message
        return sendMail(email, title, message)
    });

    function sendMail(email, title, message){
        return transport.sendMail({
            from: 'smiling.bird.clinic@gmail.com',
            to: email,
            subject: title,
            text: message
        })
        .then(r => console.log(r))
        .catch(e => e);
    }
