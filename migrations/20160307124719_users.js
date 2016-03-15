
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.string('Name').notNullable().unique().primary();
    table.string('Password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
