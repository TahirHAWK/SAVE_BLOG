
const {axios, express, app, nodemailer, mongodb, connectionString} = require('./pages/dependencies')



let databaseConnection = mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    app.listen(3000) 
})   
module.exports = {databaseConnection}