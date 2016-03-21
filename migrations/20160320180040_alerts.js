
exports.up = function(knex, Promise) {
  return knex.schema.createTable('alerts', function(table){
    table.increments();
    table.integer('Data_Store_ID').references('id').inTable('data_stores').onDelete('cascade');
    table.string('Name').notNullable();
    table.string('Comparer').references('Comparer').inTable('comparer');
    table.integer('Value').notNullable();
    table.boolean('Enabled').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('alerts');
};
