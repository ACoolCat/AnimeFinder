//=============
//DEPENDENCIES
//=============
const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/users.js')
const bcrypt = require('bcrypt')
const router = express.Router();


//LOG-IN
//=============
router.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error, foundUser) => {
        if(foundUser === null){
            res.json({message:'user not found'})
        } else {
          const comparePassword = bcrypt.compareSync(req.body.password, foundUser.password)
            if(comparePassword){
              req.session.user = foundUser
              res.json(foundUser)
            } else {
              res.json({ message:'password is wrong'})
            }
        }
    })
})


//GET
//=============
router.get('/', (req, res) => {
    res.json(req.session.user)
})


//LOG-OUT
//=============
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.json({
          destroyed:true
        })
    })
})

module.exports = router
