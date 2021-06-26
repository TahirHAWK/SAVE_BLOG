let db
const axios = require('axios');
const {express, app, nodemailer, mongodb, connectionString} = require('../server')
// this line tells express to automatically take asynchronous request data and add it to req object
mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    
})
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
            <div id="contact" class="contact">
                <li><form id="form" action="/create-blog" method="POST">
                  <h2>Blog</h2>
                  <input name="heading" type="text" placeholder="Heading" id="email">
                  <input name="blog_body" type="textarea" placeholder="Blog body">
                  <input type="submit" id="submit">
                  </form>
                </li>  
                </div>
              
        
                <div class="blog_body2">
                    ${myBlog.map(function(anyName){
                        return `<li class="heading" id="heading">${anyName.heading}</li>
                        <li class="blog_body" id="blog_body">${anyName.blog_body} </li>
                        <button data-id="${anyName._id}"  class="edit">Edit</button>
                        <button>Delete</button>`
                    }).join('')}
                </div>
                <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

                <script src="/browserSide.js"></script>
        </body>
        </html>`)
    })
    
}

module.exports = {homefunction}