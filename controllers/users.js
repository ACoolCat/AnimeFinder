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
  User.create(req.body, (err, createdUser) => {
    if(err) {
      res.send('Something went wrong. Please try again later')
    } else{
      res.redirect('/')
    }
  })
})

module.exports = users
