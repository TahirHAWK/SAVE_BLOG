
const {axios, express, app, nodemailer, mongodb, ObjectId, connectionString} = require('./dependencies')
let {databaseConnection} = require('../db')


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
    console.log('performing check if it is valid...')
    // here "ObjectId" is a mongodb function that provides "isValid" function by which we can check the single blog id requested by the user if it has the length of a valid mongodb ID or not. If yes the id will enter the database section and checked there if it exists or not.
    if(ObjectId.isValid(idFromLink)){
      console.log('Validation done, it works.')
  db.collection('myBlog').find().toArray(function(err, myBlog){
      let TotalElementArray = myBlog.length         // this is the length of the myBlog array which contains the data that are going to be displayed on a single post. 
      for(let x = 0; x < TotalElementArray; x++){
        // myBlog contains it as multiple objects inside an array. where to access each index, myBlog[index] is declared as x and for each index "object", there's an '_id' property that has to be compared with the user input id field.
        if(myBlog[x]._id == idFromLink){
          console.log("id matched on index " + x)
          function getData(item) {
            if(item._id == idFromLink){
              let heading = item.heading;
              let blog_body = item.blog_body
              return [heading, blog_body]
                                      }
                          }   
              // In the getData function it takes the data and forms an array with multiple object inside.
              // here myBlog is an array which can be accessed myBlog[2] etc but when it comes to applying logic and conditions, it must use map because it writes a separate array for this and does its operation, myBlog is a fixed array and cannot be changed. But myBlog.map(anyMethod)[x] is a new array and can be changed.
            let y = 0
            // the getData function makes other arrays null except the one you're looking for, so while checking all the indexes here the only one will show output which contains the actual data while other array objects are being null.
            while(y <= TotalElementArray){
              if(myBlog.map(getData)[y]){
                res.send(`<h1>${myBlog[y].heading} </h1><br>
                Blog:<p> ${myBlog[y].blog_body}</p>`)
                                          }
                y++ 
                                }

          break;
      }
      // here if the '_id' value doesn't match with any of the database id it will come to this execution. here it will check multiple times untill the end the array. We cannot quit the execution untill we checked all the myBlog index objects.
        else if (myBlog[x]._id !== idFromLink){
          if(x == TotalElementArray-1){
            console.log("doesnt exist !!!!")
            res.send(`<h1>The page you're looking for doesn't exists. </h1>
                    <p>Go to <a href="/blog">Activities Page.</a></p>`)
        } else if(x !== TotalElementArray) {
            console.log("doesnt exist on this index of array, but still need to check !!!!")
            continue;
          }

        } //end of else if
    }  // end of for loop after entering database to check id
    
     

  })
  
  } // end of if statement of valid id
    else {// else if the id doesnt have the length of a valid id
      console.log("Nothing found")
      res.send(`<h1>The page you're looking for doesn't exists. </h1>
                <p>Go to <a href="/blog">Activities Page.</a></p>`)
    }
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
              <a href="/blog/${anyName._id}">Read More</a>
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