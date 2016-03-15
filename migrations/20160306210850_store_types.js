
exports.up = function(knex, Promise) {
  return knex.schema.createTable('store_types', function(table){
    table.string('Name').notNullable().unique().primary();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('store_types');
};
