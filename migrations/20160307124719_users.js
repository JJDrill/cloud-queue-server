
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('Name').notNullable().unique();
    table.string('Password').notNullable();
    table.string('Phone_Number');
    table.boolean('Receive_SMS').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
