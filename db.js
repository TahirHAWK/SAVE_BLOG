
const {axios, express, app, nodemailer, mongodb, connectionString} = require('./pages/dependencies')

// while importing databases, do no import or export "Let db" part, as it causes error like 'undefined db' or something like that. so, in the dependencies folder, declare "Let db" but don't export it.


let databaseConnection = mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    app.listen(3000) 
})   
module.exports = {databaseConnection}