const mongoose = require("mongoose");
const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/users.js");

//=========
//CREATE
//=========
users.post("/", (req, res) => {
  //Encrypt user password
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  //Creates the new user
  Users.create(req.body, (err, newUser) => {
    if (err) {
      console.log("is this where we hit?");
      res.send(err);
    } else {
      res.json(newUser);
    }
  });
});
