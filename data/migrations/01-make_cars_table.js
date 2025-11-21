exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('cars',function(table){
    table.increments('id');
    table.string('vin',17).unique().notNullable();
    table.string('make',50).notNullable();
    table.string('model',50).notNullable();
    table.integer('mileage').notNullable();
    table.string('title',50).Nullable();
    table.string('transmission',50).Nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
