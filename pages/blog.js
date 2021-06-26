let db
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