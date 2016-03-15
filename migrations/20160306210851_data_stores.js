
exports.up = function(knex, Promise) {
  return knex.schema.createTable('data_stores', function(table){
    table.increments();
    table.string('Project_Name').references('Name').inTable('projects').onDelete('cascade');
    table.string('Type_ID').references('Name').inTable('store_types').onDelete('cascade');
    table.string('Name').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('data_stores');
};
