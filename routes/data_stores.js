var express = require('express');
var router = express.Router();
var http = require('http');
// var passport = require('passport');
var knex = require('../db/knex');
var db_Data_Stores = require('../db/tbl_data_stores');
var Queues = require('./queues');

router.post('/', function(req, res){
  db_Data_Stores.Add_Data_Store(req.body.project_group_id,
                                req.body.store_type,
                                req.body.data_store_name)
  .then(function(result){
    res.send(result);
  })
})

router.get('/', function(req, res){
  db_Data_Stores.Get_List().then(function(result){
    res.send(result);
  })
})

router.get('/:project_id', function(req, res){
  db_Data_Stores.Get_Datastore_Details(req.params.project_id)
  .then(function(result){
    var siteUrl = req.protocol + '://' + req.get('host') + "/api"

    for (var i = 0; i < result.length; i++) {

      if (result[i].Type_ID === 'Queue') {
        var storeUrl = siteUrl + "/queues/" + result[i].id

        result[i].Actions = []
        result[i].Actions.push({
          Name: "Enqueue",
          Verb: "POST",
          Url: storeUrl + "/enqueue"
        })

        result[i].Actions.push({
          Name: "Dequeue",
          Verb: "GET",
          Url: storeUrl + "/dequeue"
        })

        result[i].Actions.push({
          Name: "Purge",
          Verb: "DELETE",
          Url: storeUrl + "/purge"
        })
      }
    }
    // console.log("service result: ", result);
    res.send(result);
  })
})

router.get('/:type', function(req, res){
  db_Data_Stores.Get_List(req.params.type).then(function(result){
    res.send(result);
  })
})

router.delete('/:id', function(req, res){
  db_Data_Stores.Delete_Data_Store(req.params.id).then(function(result){
    res.sendStatus(result);
  })
})

router.put('/:id', function(req, res){
  db_Data_Stores.Update_Name(req.params.id, req.body.name).then(function(result){
    res.send(result);
  })
})

module.exports = router;
