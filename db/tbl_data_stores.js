var knex = require('../db/knex');

function Data_Stores(){
  return knex('data_stores')
};

function Projects(){
  return knex('projects')
}

module.exports = {

  Add_Data_Store: function(project_group_id, store_type, data_store_name){
    return Data_Stores().insert({
        Project_Name: project_group_id,
        Type_ID: store_type,
        Name: data_store_name
    }, 'id')
  },

  Get_List: function(store_type){
    if (store_type === undefined) {
      return Data_Stores()
    } else {
      return Data_Stores()
      .where('Type_ID', store_type)
    }
  },

  Get_List_By_Project: function(project_id){
    if (store_type === undefined) {
      return Data_Stores()
    } else {
      return Data_Stores()
      .where('Type_ID', store_type)
    }
  },

  Get_Datastore_Details: function(Project_Group_ID){
    return Data_Stores()
    .select('id', 'Type_ID', 'Name')
    .where('Project_Name', Project_Group_ID)
  },

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
