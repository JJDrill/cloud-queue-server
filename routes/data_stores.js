var express = require('express');
var router = express.Router();
// var passport = require('passport');
var knex = require('../db/knex');
var db_Data_Stores = require('../db/tbl_data_stores');

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
    res.sendStatus(result);
  })
})

module.exports = router;
