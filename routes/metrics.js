var express = require('express')
var router = express.Router()
var unirest = require('unirest')
// var passport = require('passport');
var knex = require('../db/knex')
var http = require("http")
// var Socket = require("socket.io")
var db_Projects = require('../db/tbl_projects')
var db_Data_Stores = require('../db/tbl_data_stores')
var db_Metrics = require('../db/tbl_store_metrics')

var app = express()
var server = http.Server(app)
// var io = Socket(server)

router.get('/:project_name', function(req, res){
  db_Metrics.Get_Project_Metrics(req.params.project_name, 3600).then(function(data){
    res.send(data)
  })
})

module.exports = router;
