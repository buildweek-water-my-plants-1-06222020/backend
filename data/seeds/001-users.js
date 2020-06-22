
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
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
