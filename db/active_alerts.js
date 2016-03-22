var active_alerts = [];

module.exports = {

  Get_Alerts: function(){
    var return_list = []
    return_list = return_list.concat(active_alerts)
    this.Purge_Active_Alerts()
    return return_list
  },

  Add_Alert: function(new_alert){
    active_alerts.push(new_alert)
    console.log("New alert added...");
  },

  Purge_Active_Alerts: function(){
    active_alerts = []
    return "Success"
  }

}
