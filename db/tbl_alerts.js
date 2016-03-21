var knex = require('../db/knex');

function Alerts(){
  return knex('alerts')
};

module.exports = {

  Get_Alerts: function(store_id){
    if (store_id === undefined) {
      return Alerts()
      .orderBy('Name')
    } else {
      return Alerts()
      .where('Data_Store_ID', store_id)
      .orderBy('Name')
    }
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
