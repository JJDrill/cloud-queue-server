var knex = require('../db/knex');

function Projects(){
  return knex('projects')
};

module.exports = {
  Get_Projects: function(){
    return Projects()
    .orderBy('Name')
  },

  Get_Project: function(project_name){
    return Projects().where('Name', project_name);
  },

  Add_Project: function(project_name){
    return Projects().insert({
        Name: project_name
    })
  },

  Delete_Project: function(project_name){
    return  Projects()
            .where('Name', project_name)
            .del()
  }

}
