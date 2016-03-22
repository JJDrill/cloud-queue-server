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
var client = require('twilio')();

var auth = require('./routes/auth');
var projects = require('./routes/projects');
var data_stores = require('./routes/data_stores');
var queues = require('./routes/queues');
var metrics = require('./routes/metrics');
var alerts = require('./routes/alerts');

var db_Store_Metrics = require('./db/tbl_store_metrics');
var Active_Alerts = require('./db/active_alerts');
var db_Users = require('./db/tbl_users')

var app = Express()
var server = http.Server(app)
var io = Socket(server)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));

app.use(auth.passport.initialize());
app.use(auth.authenticate);

app.use('/api/auth', auth.router);
app.use('/api/projects', projects);
app.use('/api/stores', data_stores);
app.use('/api/queues', queues);
app.use('/api/metrics', metrics);
app.use('/api/alerts', alerts);


io.on("connection", function (socket){
  var metricGranularitySec = 5
  console.log('Creating metric channel...');

  var intervalParam = setInterval(function () {
    db_Store_Metrics.Get_Project_Metrics(metricGranularitySec).then(function(data){
      data.Alerts = Active_Alerts.Get_Alerts()
      socket.emit("metrics", data)
      for (var i = 0; i < data.Alerts.length; i++) {
        // loop through all users which requested SMS
        db_Users.Get_Phone_Number_List().then(function(number_list){
          for (var i = 0; i < number_list.length; i++) {
            var send_number = '+' + number_list[i].Phone_Number
            Send_SMS(send_number, data.Alerts[i])
          }
        })
      }
    })
  }, metricGranularitySec*1000)

  socket.on("disconnect", function(){
    clearInterval(intervalParam);
    // console.log('Client disconnected...');
  })
}, 5000)

io.on("disconnect", function(){
  clearInterval(intervalParam);
  // console.log('Client disconnected...');
})

server.listen(process.env.PORT || 3000, function () {
  console.log("listening on 3000")
})

Send_SMS = function(toPhoneNumber, message){
  client.sendMessage({
    to: toPhoneNumber, // Any number Twilio can deliver to
    from: process.env.TWILIO_PHONE_NUMBER, // A number you bought from Twilio and can use for outbound communication
    body: message // body of the SMS message
}, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (!err) {
      // console.log("Successfuly sent SMS...");
      // console.log(responseData.from);
      // console.log(responseData.body);
    } else {
      console.log("Error sending SMS: ", err);
    }
});
}
