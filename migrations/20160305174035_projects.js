
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(table){
    table.string('Name').notNullable().unique().primary();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};
