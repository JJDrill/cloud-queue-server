var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var bodyParser = require('body-parser');
var cors = require('cors');
// var passport = require('passport')
var LocalStrategy = require('passport-local')
// var bcrypt = require('bcrypt');
// var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser')

require('dotenv').load();

var auth = require('./routes/auth');
var projects = require('./routes/projects');
var data_stores = require('./routes/data_stores');
var queues = require('./routes/queues');
var metrics = require('./routes/metrics');

var db_Store_Metrics = require('./db/tbl_store_metrics');

var app = Express()
var server = http.Server(app)
var io = Socket(server)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));

app.use('/api/auth', auth.router);
app.use('/api/projects', projects);
app.use('/api/stores', data_stores);
app.use('/api/queues', queues);
app.use('/api/metrics', metrics);


io.on("connection", function (socket){
  var metricGranularitySec = 5
  console.log('Creating metric channel...');

  var intervalParam = setInterval(function () {
    db_Store_Metrics.Get_Project_Metrics(5).then(function(data){
      // console.log(data);
      socket.emit("metrics", data)
    })
  }, metricGranularitySec*1000)

  socket.on("disconnect", function(){
    clearInterval(intervalParam);
    console.log('Client disconnected...');
  })
}, 5000)

io.on("disconnect", function(){
  clearInterval(intervalParam);
  console.log('Client disconnected...');
})

server.listen(process.env.PORT || 3000, function () {
  console.log("listening on 3000")
})
