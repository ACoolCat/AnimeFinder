const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')
const users = express.Router()

users.get('/new', (req, res) => {
  res.render('users/new.ejs', {

  })
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
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
