var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db_Alerts = require('../db/tbl_alerts');

router.post('/', function(req, res){
  db_Alerts.Add_Alert({
    Data_Store_ID: req.body.store_id,
    Name: req.body.name,
    Comparer: req.body.comparer,
    Value: req.body.value,
    Enabled: true
  }).then(function(){
    res.send("Success")
  })
})

router.get('/', function(req, res){
  db_Alerts.Get_Alerts().then(function(message){
    res.send(message)
  })
})

router.put('/', function(req, res){
  var alert_info = {
    id: req.body.id,
    Name: req.body.name,
    Comparer: req.body.comparer,
    Value: req.body.value,
    Enabled: req.body.enabled
  }
  db_Alerts.Update_Alert(alert_info).then(function(message){
    res.sendStatus(200)
  })
})

router.get('/:store_id', function(req, res){
  db_Alerts.Get_Alerts(req.params.store_id).then(function(message){
    res.send(message)
  })
})

router.get('/byproject/:id', function(req, res){
  db_Alerts.Get_Alerts_By_Project(req.params.id).then(function(message){
    res.send(message)
  })
})


router.get('/comparers/list', function(req, res){
  db_Alerts.Get_Alert_Comparers().then(function(message){
    res.send(message)
  })
})


router.delete('/:alert_id', function(req, res){
  db_Alerts.Delete_Alert(req.params.alert_id).then(function(message){
    res.send(message)
  })
})

module.exports = router;
