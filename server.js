const {axios, express, app, nodemailer, mongodb, ObjectId, connectionString} = require('./pages/dependencies')

let {databaseConnection} = require('./db')

// this line tells express to automatically take asynchronous request data and add it to req object
app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below

const {indexFile} = require('./pages/index')
app.get('/index', indexFile)

const {homefunction} = require('./pages/home')
app.get('/', homefunction)
// homepage functions ends here


const {contactPage, contactEmail} = require('./pages/contact')
app.post('/contact-email', contactEmail)
app.get('/contact', contactPage)
// contact functions ends here


const {createBlog, editBlog, singleBlog, showBlogOnly, deleteBlog} = require('./pages/blog')
app.post('/create-blog', createBlog)
app.post('/edit-blog', editBlog)
app.post('/delete-blog', deleteBlog)
app.get('/blog', showBlogOnly)
app.get('/blog/:id', singleBlog)  
// blog functions ends here

// Test functions goes here
const {testFunctionGet, testFunctionPost} = require('./pages/test')
app.get('/test', testFunctionGet)
app.post('/test-post', testFunctionPost)

//Problem: I have no idea why, but if this line stays upwords somewhere, the other codes doesn't work, it gets timed out. Every any request gets executed, this one also does.
// solution: As it turns out, it was '/:id' instead of '/blog/:id', that's why any request is getting executed this one considers it as an id type string and gets executed again.

// blog functions ends here

// Problem 1: crbug/1173575, non-JS module files deprecated.

// How it solved: Place the get request of individual id for single post, at the very bottom. That's why the contact page wasn't working.

// Problem 2: Cannot set headers after they are sent to the client

// How it solved: just clean cache and cookies with Ccleaner, and then restart PC.

// The error "Error: Can't set headers after they are sent." means that you're already in the Body or Finished state, but some function tried to set a header or statusCode. When you see this error, try to look for anything that tries to send a header after some of the body has already been written. For example, look for callbacks that are accidentally called twice, or any error that happens after the body is sent.

// In your case, you called res.redirect(), which caused the response to become Finished. Then your code threw an error (res.req is null). and since the error happened within your actual function(req, res, next) (not within a callback), Connect was able to catch it and then tried to send a 500 error page. But since the headers were already sent, Node.js's setHeader threw the error that you saw.