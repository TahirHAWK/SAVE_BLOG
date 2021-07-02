const {axios, express, app, nodemailer, mongodb, connectionString} = require('./pages/dependencies')

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
app.get('/:id', singleBlog)     //I have no idea why, but if this line stays upwords somewhere, the other codes doesn't work, it gets timed out. Every any request gets executed, this one also does.

// blog functions ends here

// Problem 1: crbug/1173575, non-JS module files deprecated.

// How it solved: Place the get request of individual id for single post, at the very bottom. That's why the contact page wasn't working.

// Problem 2: Cannot set headers after they are sent to the client

// How it solved: just clean cache and cookies with Ccleaner, and then restart PC.

