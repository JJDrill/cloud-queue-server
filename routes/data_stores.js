var express = require('express');
var router = express.Router();
var http = require('http');
// var passport = require('passport');
var knex = require('../db/knex');
var db_Data_Stores = require('../db/tbl_data_stores');
var Queues = require('./queues');
var db_Alerts = require('../db/tbl_alerts')

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
  var promiseArray = []

  db_Data_Stores.Get_Datastore_Details(req.params.project_id)
  .then(function(storeDetailList){
    var siteUrl = req.protocol + '://' + req.get('host') + "/api"

    for (var i = 0; i < storeDetailList.length; i++) {
      // var item = new Promise( function(resolve, reject) {
      //   get_Store_Details(storeDetailList[i].id, storeDetailList[i], siteUrl)
      // })

      // var item = Promise.resolve(
      //   get_Store_Details(storeDetailList[i].id, storeDetailList[i], siteUrl)
      // )

      // promiseArray.push(item)
      // Create all the store APIs here
      if (storeDetailList[i].Type_ID === 'Queue') {
        var storeUrl = siteUrl + "/queues/" + storeDetailList[i].id

        storeDetailList[i].Actions = []
        storeDetailList[i].Actions.push({
          Name: "Enqueue",
          Verb: "POST",
          Url: storeUrl + "/enqueue"
        })

        storeDetailList[i].Actions.push({
          Name: "Dequeue",
          Verb: "GET",
          Url: storeUrl + "/dequeue"
        })

        storeDetailList[i].Actions.push({
          Name: "Purge",
          Verb: "DELETE",
          Url: storeUrl + "/purge"
        })
      }

    }
    // Promise.all(promiseArray).then(function(values){
    //   console.log("test");
    //   console.log("values: ", values);
    // })
    res.send(storeDetailList);
  })
})

get_Store_Details = function(store_id, returnObject, siteUrl){

  // Create all the store APIs here
  if (returnObject.Type_ID === 'Queue') {
    var storeUrl = siteUrl + "/queues/" + returnObject.id

    returnObject.Actions = []
    returnObject.Actions.push({
      Name: "Enqueue",
      Verb: "POST",
      Url: storeUrl + "/enqueue"
    })

    returnObject.Actions.push({
      Name: "Dequeue",
      Verb: "GET",
      Url: storeUrl + "/dequeue"
    })

    returnObject.Actions.push({
      Name: "Purge",
      Verb: "DELETE",
      Url: storeUrl + "/purge"
    })
  }

  db_Alerts.Get_Alerts(store_id).then(function(alert_list){
    returnObject.Alerts = alert_list
    // console.log(returnObject);
    return returnObject
  })
}

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
