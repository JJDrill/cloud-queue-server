var knex = require('../db/knex');

function Users(){
  return knex('users')
};

module.exports = {
  Get_Users: function(){
    return Users()
    .orderBy('Name')
  },

  Get_User_By_ID: function(user_id){
    return Users()
    .where('id', user_id)
    .first();
  },

  Get_User_By_Name: function(user_name){
    return Users()
    .where('Name', user_name)
    .first();
  },

  Add_User: function(user_email, user_password){
    return Users().insert({
        Name: user_email,
        Password: user_password
    }, 'id')
  },

  Delete_User: function(user_id){
    return  Users()
            .where('id', user_id)
            .del()
  }

}
