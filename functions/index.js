const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

 const admin = require('firebase-admin');
 admin.initializeApp()
 require('dotenv').config()

 const {SENDER_EMAIL,SENDER_PASSWORD} = process.env;

// intento 1

//   exports.sendEmailNotification = functions.firestore.document('alreadymademail/{docId}').onCreate((snap,ctx)=>{

//       const data = snap.data();

//       let autData=nodemailer.createTransport({
//         host: 'gmail',
//         port: 465,
//         secure: true,
//           auth:{
//               user: smiling.bird.clinic@gmail.com,
//               pass: bziyokcbfovbqhtu
//           }
//       });

//       autData.sendMail({
//            from :'smiling.bird.clinic@gmail.com',
//            to: `${data.email}`,
//            subject: `${data.title}`,
//            text: `${data.message}`,
//            html: `${data.message}`

//       }).then(res=>console.log('Se mando')).catch(err=>console.log(err));

//   });

// fin de intento 1

//intento 2

   let transport = nodemailer.createTransport({
       service: "Gmail",
       auth: {
           user: 'smiling.bird.clinic@gmail.com',
           pass: 'bziyokcbfovbqhtu'
       }
  })

   exports.mail = functions.firestore.document("alreadymademail/{id}").onCreate((snap, context) => {

           const email = snap.data().email
           const title = snap.data().title
           const message = snap.data().message
           console.log(snap.data());
         transport.sendMail({

               from: 'smiling.bird.clinic@gmail.com',
               to: email,
               subject: title,
               text: message

          })
          .then(r=>console.log(r))
          .catch(e=> console.log(e))
          return null
       });

        //  transporter.sendMail(mailOptions,(error,info) =>{
        //      if(error){
        //          console.log(error);
        //          reject(erro)
        //      }
        //      console.log(info.messageId);
        //      resolve(info)
        //  })
        //  return null;

//fin de intento 2

//intento 3

//   let transport = nodemailer.createTransport({
//     service: "smtp.gmail.com",
//     auth: {
//       user: 'smiling.bird.clinic@gmail.com',
//       pass: 'bziyokcbfovbqhtu'
//     }
//   })
//   exports.mail = functions.firestore.document('alreadymademail/{docId}').onCreate((snap, context) => {

//     const email = snap.data().email
//     const title = snap.data().title
//     const message = snap.data().message
//     console.log(snap.data());
//     return sendMail(email, title, message)
//   });

//   function sendMail(email, title, message) {
//     return transport.sendMail({
//         from: 'hihi@gmail.com',
//         to: email,
//         subject: title,
//         text: message

//       })
//       .then(r => console.log(r))
//       .catch(e => console.log(e));
//   }

  //fin intento 3

    // exports.mail = functions.firestore.document('alreadymademail/{docId}').onCreate((snap, context) => {

    //   const email = snap.data().email
    //   const title = snap.data().title
    //   const message = snap.data().message
    //   console.log(snap.data());

    // });

    // let transport = nodemailer.createTransport({
    //   service: "smtp.gmail.com",
    //   auth: {
    //     user: 'user@gmail.com',
    //     pass: 'xyz'
    //   }
    // })

    // transport.sendMail({
    //     from: 'hihi@gmail.com',
    //     to: email,
    //     subject: title,
    //     text: message
    //   })
    //   .then(r => console.log(r))
    //   .catch(e => console.log(e));
    // }

//fin intento 3
