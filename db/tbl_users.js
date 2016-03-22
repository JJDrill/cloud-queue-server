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

  Get_Phone_Number_List: function(){
    return Users()
    .select('Phone_Number')
    .where('Receive_SMS', true)
  },

  Add_User: function(user_email, user_password, user_phone, receiveSMS){
    return Users().insert({
        Name: user_email,
        Password: user_password,
        Phone_Number: user_phone,
        Receive_SMS: receiveSMS
    }, 'id')
  },

  Delete_User: function(user_id){
    return  Users()
            .where('id', user_id)
            .del()
  }

}
