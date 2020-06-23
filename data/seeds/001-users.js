
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'first', 
          password: 'taco',
          phone_number: '1234567890'
        },
      ]);
    });
};
