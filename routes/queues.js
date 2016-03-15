var express = require('express');
var router = express.Router();
// var unirest = require('unirest')
// var passport = require('passport');
var knex = require('../db/knex');
var db_Data_Stores = require('../db/tbl_data_stores');
var db_Metrics = require('../db/tbl_store_metrics');

var Queue_List = {};

db_Data_Stores.Get_List('Queue').then(function(queueList){
  for (var i = 0; i < queueList.length; i++) {
    Queue_List[queueList[i].id] = [];
  }
})

router.get('/status', function(req, res){
  res.send(Queue_List)
})

router.post('/:queueID/enqueue', function(req, res){
  Queue_List[req.params.queueID].push(req.body.message)
  res.send("Success")

  db_Metrics.Submit_Metrics({
    Data_Store_ID: req.params.queueID,
    Date_Time: new Date(),
    Activity_Name: "Enqueue",
    Activity_Value: 1,
    Store_Depth: Queue_List[req.params.queueID].length
  })
})

router.get('/:queueID/dequeue', function(req, res){
  var message = Queue_List[req.params.queueID].pop()
  res.send(message)

  db_Metrics.Submit_Metrics({
    Data_Store_ID: req.params.queueID,
    Date_Time: new Date(),
    Activity_Name: "Dequeue",
    Activity_Value: 1,
    Store_Depth: Queue_List[req.params.queueID].length
  })
})

router.delete('/:queueID/purge', function(req, res){
  Queue_List[req.params.queueID] = []
  res.send("Success")

  db_Metrics.Submit_Metrics({
    Data_Store_ID: req.params.queueID,
    Date_Time: new Date(),
    Activity_Name: "Purge",
    Activity_Value: 1,
    Store_Depth: Queue_List[req.params.queueID].length
  })
})

module.exports = router;
