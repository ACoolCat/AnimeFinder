const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')
const users = express.Router()

users.get('/new', (req, res) => {
  console.log("get method has been hit");
  res.render('users/new.ejs', {
    currentUser:req.session.currentUser
  })
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  console.log("Post method has been hit");
  User.create(req.body, (err, createdUser) => {
    console.log("Create method has been hit");
    if(err) {
      console.log(err);
      res.send('Something went wrong. Please try again later')
    } else{
      console.log('account created', createdUser);
      res.redirect('/')
    }
  })
})

module.exports = users
