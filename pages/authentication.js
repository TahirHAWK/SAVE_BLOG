const {axios, express, app, nodemailer, mongodb, connectionString} = require('../server')

let transporter = nodemailer.createTransport({
    service: 'hotmail',
  
  
    auth: {
      user: 'tahirtamin20@outlook.com',
      pass: 'mycpscr56964'
    }
  });

  module.exports = {transporter}