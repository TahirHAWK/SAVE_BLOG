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
  <header id="header">
  <nav id="nav-bar">
  <li><a href="/index"><img id="header-img" src="https://scontent.fdac12-1.fna.fbcdn.net/v/t1.6435-9/121596169_132300508620920_9118668398298529590_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6vhFEV8-APgAX84vwQy&tn=Uf6FDVnbHUU-zVXl&_nc_ht=scontent.fdac12-1.fna&oh=0429cdcf44b30e04d3c4c59228f8eaff&oe=60DB4149" alt="save logo" class="logo"></a></li>
  <li><a class="nav-link" href="/">Home</a></li>
  <li><a class="nav-link" href="/blog">Our Activities</a></li>
  <li><a class="nav-link" href="/contact">Contact</a></li>
    
  </nav>
</header>
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