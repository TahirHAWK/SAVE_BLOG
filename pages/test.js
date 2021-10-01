const {axios, express, app, nodemailer, mongodb, ObjectId, connectionString} = require('./dependencies')
let {databaseConnection} = require('../db')

// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below



let testFunctionGet = function(req, res){
    db.collection('myBlog').find().sort({"_id": -1}).toArray(function(err, myBlog){
        res.send(`
        <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="test.css">

           <title>Document</title>
       </head>
       <body>
           <form action="/test-post" method="POST">
           <input type="text" name="email" id="email">
           <input type="submit" value="Click">
       
           </form>
        
           ${myBlog.map(function(any){

               return `

                   <li>${any.heading} <br>
                   ${any.blog_body}
                   </li>
               `
           }).join('')}

           <script src=""></script>
           </body>
       </html>
        `)
       })
    }
 

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

console.log(makeid(5), 'executed automatically');

let testFunctionPost = function(req, res){

    db.collection('myBlog').insertOne({heading: makeid(24),
        blog_body: req.body.email}, function(){
            
            res.redirect('/test')
        })
}
module.exports = {testFunctionGet, testFunctionPost}