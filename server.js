const axios = require('axios');
let express = require('express')
let app = express()
let nodemailer = require('nodemailer')
let mongodb = require('mongodb')
let db
let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
module.exports = {axios, express, app, nodemailer, mongodb, connectionString}
mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    app.listen(3000) 
})
// this line tells express to automatically take asynchronous request data and add it to req object
app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below

const {homefunction} = require('./pages/home')
app.get('/', homefunction)
// homepage functions ends here

const {createBlog, editBlog, showBlogOnly} = require('./pages/blog')
app.post('/create-blog', createBlog)
app.post('/edit-blog', editBlog)
app.get('/blog', showBlogOnly)
// blog functions ends here
const {contactPage, contactEmail} = require('./pages/contact')
app.get('/contact', contactPage)
app.post('/contact-email', contactEmail)
// contact functions ends here
