
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 160)
        .unique()
        .notNullable()
        .index();
      tbl.string('password', 256)
        .notNullable();
      tbl.string('phone_number', 15)
        .notNullable();
    })
    .createTable('plants', tbl => {
      tbl.increments();
      tbl.string('nickname', 256)
        .notNullable();
      tbl.string('species', 256)
        .notNullable();
      tbl.string('h2o_frequency', 120)
        .notNullable();
      tbl.string('img_url', 999);
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
};
