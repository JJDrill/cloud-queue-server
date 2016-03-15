var knex = require('../db/knex');

function Data_Stores(){
  return knex('data_stores')
};

module.exports = {

  Add_Data_Store: function(project_group_id, store_type, data_store_name){
    return Data_Stores().insert({
        Project_Group_ID: project_group_id,
        Type_ID: store_type,
        Name: data_store_name
    })
  },

  Get_List: function(store_type){
    if (store_type === undefined) {
      return Data_Stores()
    } else {      
      return Data_Stores()
      .where('Type_ID', store_type)
    }
  },

  // Get_Depth_Info: function(project_name){
  //   return Data_Stores()
  //   .select('Name', 'Type_ID', 'Depth')
  //   .where('Project_Name', project_name)
  //   .orderBy('Name')
  //   .then(function(data){
  //     console.log(data);
  //     return {
  //       "Project_Name": project_name,
  //       "Date_Time": new Date(),
  //       "Metrics": data
  //     }
  //   })
  // },

  // Update_Depth: function(store_id, depth){
  //   return Data_Stores()
  //   .where('id', store_id)
  //   .update({
  //     Depth: depth
  //   }).then()
  // },

  Update_Name: function(store_id, name){
    return Data_Stores()
    .where('id', store_id)
    .update({
      Name: name
    })
  },

  Delete_Data_Store: function(store_id){
    return Data_Stores()
    .where('id', store_id)
    .del()
  }

}
