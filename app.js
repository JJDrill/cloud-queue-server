var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var bodyParser = require('body-parser');
var cors = require('cors');

var projects = require('./routes/projects');
var data_stores = require('./routes/data_stores');
var queues = require('./routes/queues');
var metrics = require('./routes/metrics');

var db_Projects = require('./db/tbl_projects');
var db_Data_Stores = require('./db/tbl_data_stores');
var db_Store_Metrics = require('./db/tbl_store_metrics');

var app = Express()
var server = http.Server(app)
var io = Socket(server)

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(Express.static("./client"))
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
