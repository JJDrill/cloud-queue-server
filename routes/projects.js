var express = require('express');
var router = express.Router();
// var passport = require('passport');
var knex = require('../db/knex');
var db_Projects = require('../db/tbl_projects');

router.post('/add', function(req, res){
  db_Projects.Get_Project(req.body.name).then(function(result){

    if (result.length > 0) {
      res.send("Error: Project '" + req.body.name + "' already exists.")
    } else {
      db_Projects.Add_Project(req.body.name).then(function(result){
        res.send("Success");
      })
    }
  })
})

router.get('/', function(req, res){
  db_Projects.Get_Projects().then(function(returnList) {
    res.send(returnList);
  })
})

router.delete('/', function(req, res){
  db_Projects.Delete_Project(req.body.name).then(function(result){
    res.sendStatus(result);
  })
})

module.exports = router;
