var knex = require('../db/knex');
var Active_Alerts = require('./active_alerts');
var db_Data_Stores = require('./tbl_data_stores');

function Alerts(){
  return knex('alerts')
};

function Comparer(){
  return knex('comparer')
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

  Get_Alerts_By_Project: function(project_id){
    return knex('data_stores')
    .select('data_stores.id', 'data_stores.Project_Name', 'data_stores.Name as Store_Name',
    'alerts.id as Alert_ID','alerts.Name', 'alerts.Comparer', 'alerts.Value', 'alerts.Enabled')
    .where('Project_Name', project_id)
    .rightJoin('alerts', 'data_stores.id', 'alerts.Data_Store_ID')
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

  Get_Alert_Comparers: function(){
    return Comparer()
  },

  Delete_Alert: function(alert_id){
    return Alerts()
    .where('id', alert_id)
    .del()
  }

}
