
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comparer', function(table){
    table.string('Comparer').notNullable().primary();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comparer');
};
