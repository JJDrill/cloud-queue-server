
exports.up = function(knex, Promise) {
  return knex.schema.createTable('store_metrics', function(table){
    table.increments();
    table.integer('Data_Store_ID').references('id').inTable('data_stores').onDelete('cascade');
    table.dateTime('Date_Time').notNullable();
    table.string('Activity_Name').notNullable();
    table.integer('Activity_Value').notNullable();
    table.integer('Store_Depth').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('store_metrics');
};
