const {axios, express, app, nodemailer, mongodb, connectionString} = require('./dependencies')
let {databaseConnection} = require('../db')

// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below


const {transporter} = require('./authentication')
let contactEmail = function(req, res){
    let mail_subject = req.body.email;
    let mail_body = req.body.feedback;

     var mailOptions = {
       from: 'tahirtamin20@outlook.com',
       to: 'save.hstu@gmail.com',
       subject:  `${mail_subject}, from SAVE website feedback section`,
       html: `${mail_body} <br>Reply here: <a href="mailto:${mail_subject}">Reply</a>`
     };
   
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
     res.redirect('/contact')
   }

let contactPage = function(req, res){
  res.send(`<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="contact.css">

      <title>Email</title>
  </head>
  <body>
      <div id="contact" class="contact">
          <li><form id="form" action="/contact-email" method="POST">
            <h2>Contact us</h2>
            <input name="email" type="email" placeholder="Email" id="email">
            <input name="feedback" type="textarea" placeholder="Your Comment">
            <input type="submit" id="submit">
            </form>
          </li> 
          <li>
            <a href="facebook.com/savehstuchapter">Our facebook page</a>
            <a href="mailto:save.hstu@gmail.com">Our Email</a>
          </li>
        </div>
  </body>
  </html>`)
}


module.exports = {contactPage, contactEmail}