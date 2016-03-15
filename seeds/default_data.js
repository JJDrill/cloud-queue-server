
exports.seed = function(knex, Promise) {
  return knex('data_stores').del()
  .then(function(){
  return knex('projects').del();
}).then(function(){
  return knex('store_types').del();
}).then(function(){
  return Promise.all([
    knex('store_types').insert({Name: 'Queue'}),
    knex('store_types').insert({Name: 'Stack'}),
  ]);
}).then(function(){
  return Promise.all([
    knex('projects').insert({Name: 'Project 1'}),
    knex('projects').insert({Name: 'Project 2'}),
    knex('projects').insert({Name: 'Project 3'}),
  ]);
}).then(function(){
  return Promise.all([
    knex('data_stores').insert({
      Project_Name: "Project 1",
      Type_ID: 'Queue',
      Name: 'Test Queue 1'
    }),
    knex('data_stores').insert({
      Project_Name: "Project 1",
      Type_ID: 'Queue',
      Name: 'Test Queue 2'
    }),
    knex('data_stores').insert({
      Project_Name: "Project 2",
      Type_ID: 'Queue',
      Name: 'Test Queue 3'
    }),
  ]);
})
};
