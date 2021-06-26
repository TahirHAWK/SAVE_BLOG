
const {axios, express, app, nodemailer, mongodb, connectionString} = require('../server')
// this line tells express to automatically take asynchronous request data and add it to req object
mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    
})
app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below

let createBlog = function(req, res){
    db.collection('myBlog').insertOne({heading: req.body.heading,
    blog_body: req.body.blog_body}, function(){
        
        res.redirect('/')
    })
  } 
let editBlog = function(req, res){

    db.collection('myBlog').findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {$set: {heading: req.body.heading, blog_body: req.body.blog_body}}, function(){
      res.send("Success")
    })
   
  }
 
let showBlogOnly = function(req, res) {
    db.collection('myBlog').find().sort({"_id": -1}).toArray(function(err, myBlog){
    res.send(`<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - Build_a_product_landing_page</title>
      <link rel="stylesheet" href="blog.css">
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SAVE HSTU</title>
    </head>
    <body>
      <header id="header">
        <nav id="nav-bar">
        <li><img id="header-img" src="https://scontent.fdac12-1.fna.fbcdn.net/v/t1.6435-9/121596169_132300508620920_9118668398298529590_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6vhFEV8-APgAX84vwQy&tn=Uf6FDVnbHUU-zVXl&_nc_ht=scontent.fdac12-1.fna&oh=0429cdcf44b30e04d3c4c59228f8eaff&oe=60DB4149" alt="save logo" class="logo"></li>
        <li><a class="nav-link" href="#home">Home</a></li>
        <li><a class="nav-link" href="#activities">Our Activities</a></li>
        <li><a class="nav-link" href="#contact">Contact</a></li>
          
        </nav>
      </header>
    
    
      
          ${myBlog.map(function(anyName){
            return `<div class="blog-card">
            <div class="meta">
              <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
              <ul class="details">
                <li class="author"><a href="#">John Doe</a></li>
                <li class="date">Aug. 24, 2015</li>
                <li class="tags">
                  <ul>
                    <li><a href="#">Learn</a></li>
                    <li><a href="#">Code</a></li>
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="description">
            <h1>${anyName.heading}</h1>
            <h2>Opening a door to the future</h2>
            <p> ${anyName.blog_body}</p>
            <p class="read-more">
              <a href="#">Read More</a>
              </p>
              </div>
            </div>
            ` 
          }).join('')}
    
         
    
        
        <footer>
             <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#identity">Team</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </footer>
        
      </div>
      <script src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'></script>
    </body>
    </html>
    <!-- partial -->
      
    </body>
    </html>
    `)
    })
  }

  module.exports = {createBlog, editBlog, showBlogOnly}