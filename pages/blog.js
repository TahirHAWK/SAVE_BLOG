
const {axios, express, app, nodemailer, mongodb, connectionString} = require('./dependencies')
let {databaseConnection} = require('../db')
const { Decimal128 } = require('mongodb')

// this line tells express to automatically take asynchronous request data and add it to req object

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
  let blogID = new mongodb.ObjectID(req.body.id)

    db.collection('myBlog').findOneAndUpdate({_id: blogID}, {$set: {heading: req.body.heading, blog_body: req.body.blog_body}}, function(){
      res.send("Success")
    })
   
  }

 
let deleteBlog = function(req, res){
  db.collection('myBlog').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function(){
    res.send("success")
  })
}

let singleBlog = function(req, res){
  let idFromLink = req.params.id
  // console.log({_id: idFromLink})
  // let query = {_id: idFromLink}
  db.collection('myBlog').find().toArray(function(err, myBlog){
    // res.send(`
    // ${myBlog.map(function(anyName){
    //   return `<h1>${anyName.heading}</h1>
    //   <p> ${anyName.blog_body}</p>   `
    // }).join('')}
    // `);
    
    function getHeading(item) {
      if(item._id == idFromLink){
        let heading = item.heading;
        let blog_body = item.blog_body
        
        return [heading, blog_body]
      }
    }
     
    let x = 0
    let TotalElementArray = myBlog.map(getHeading).length
    console.log(TotalElementArray)
    while(x < TotalElementArray){
      if(myBlog.map(getHeading)[x]){
        console.log(myBlog.map(getHeading)[x])
         res.send(myBlog.map(getHeading)[x])

      }
     x++ 
    } 

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
    <li><a href="/index"><img id="header-img" src="https://scontent.fdac12-1.fna.fbcdn.net/v/t1.6435-9/121596169_132300508620920_9118668398298529590_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6vhFEV8-APgAX84vwQy&tn=Uf6FDVnbHUU-zVXl&_nc_ht=scontent.fdac12-1.fna&oh=0429cdcf44b30e04d3c4c59228f8eaff&oe=60DB4149" alt="save logo" class="logo"></a></li>
    <li><a class="nav-link" href="/">Home</a></li>
    <li><a class="nav-link" href="/blog">Our Activities</a></li>
    <li><a class="nav-link" href="/contact">Contact</a></li>
      
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
              <a href="/${anyName._id}">Read More</a>
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
      
    </body>
    </html>
    <!-- partial -->
      
    </body>
    </html>
    `)
    })
  }

  module.exports = {createBlog, editBlog, singleBlog, showBlogOnly, deleteBlog}