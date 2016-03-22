var knex = require('../db/knex');
var Active_Alerts = require('./active_alerts');

function Alerts(){
  return knex('alerts')
};

module.exports = {

  Get_Alerts: function(store_id){
    if (store_id === undefined) {
      return Alerts()
      .where('Enabled', true)
      .orderBy('Name')
    } else {
      return Alerts()
      .where('Data_Store_ID', store_id)
      .where('Enabled', true)
      .orderBy('Name')
    }
  },

  Check_Alerts: function(store_id, store_depth){
    this.Get_Alerts(store_id).then(function(alert_list){
      for (var i = 0; i < alert_list.length; i++) {
        if (alert_list[i].Comparer === "Greater Than") {
          if (store_depth > alert_list[i].Value) {
            Active_Alerts.Add_Alert("Data store " + store_id +
            " has gone over " + alert_list[i].Value + " messages.")
          }
        } else if (alert_list[i].Comparer === "Less Than") {
          if (store_depth < alert_list[i].Value) {
            Active_Alerts.Add_Alert("Data store " + store_id +
            " has dropped below " + alert_list[i].Value + " messages.")
          }
        }
      }
    })
  },

  Add_Alert: function(new_alert){
    return Alerts().insert({
        Data_Store_ID: new_alert.Data_Store_ID,
        Name: new_alert.Name,
        Comparer: new_alert.Comparer,
        Value: new_alert.Value,
        Enabled: true
    })
  },

  Delete_Alert: function(alert_id){
    return Alerts()
    .where('id', alert_id)
    .del()
  }

}
