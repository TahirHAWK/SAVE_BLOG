
const {axios, express, app, nodemailer, mongodb, ObjectId, connectionString} = require('./dependencies')
let {databaseConnection} = require('../db')

// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below

let homefunction = function(req, res){
    db.collection('myBlog').find().sort({"_id": -1}).toArray(function(err, myBlog){
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="contact.css">
            <title>Document</title>
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
                <li><form id="form" action="/create-blog" method="POST">
                  <h2>Blog</h2>
                  <input name="heading" type="text" placeholder="Heading" id="email">
                  <input name="blog_body" type="textarea" placeholder="Blog body">
                  <input type="submit" id="submit">
                  </form>
                </li>  
                </div>
              
                <div class="row">
                <div class="column">
                    ${myBlog.map(function(anyName){
                        return `
                        <li class="heading" id="heading">Heading: ${anyName.heading}<br>Blog Body: ${anyName.blog_body} <br>
                        <button data-id="${anyName._id}"  class="edit">Edit</button>
                        <button data-id="${anyName._id}"  class="delete">Delete</button>
                        </li>
                        
                        
                        
                        `
                    }).join('')}
                </div>
                </div>
                <script src="axios.min.js"></script>


                <script src="/browserSide.js"></script>
        </body>
        </html>`)
    })
     
}

module.exports = {homefunction}