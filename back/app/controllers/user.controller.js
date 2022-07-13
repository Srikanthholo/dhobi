 
const { request } = require('express');
let users = require('../models/user.model')


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

  
exports.findOne = (req, res) => {
  const id = req.params.id;

  users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};


exports.userBoard = (req, res) => {
 // res.status(200).send("User Content.");

 users.find({roles: "62c2c9e84c10654b1c16a54a" }, function (err, data) {
  if (err){
      console.log(err)
  }
  else{
    res.json(data)
  }
});



};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.deleteStudent = (req, res) => {
  //res.status(200).send("Moderator Content.");

 
   users.findByIdAndDelete(req.userId, function (err, data) {

    id: req.body.id;
    
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", data);
    }
});



};


 