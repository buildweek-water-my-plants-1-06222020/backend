
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {
          nickname: 'Bamboo',
          species: 'Bambusoideae',
          h2o_frequency: '3 times per week',
          user_id: 1
        },
        {
          nickname: 'Daisy',
          species: 'Bellis Perennis',
          h2o_frequency: '2 times per week',
          user_id: 1
        },
        {
          nickname: 'Sunflower',
          species: 'Helianthus Annuus',
          h2o_frequency: '1 time per week',
          user_id: 1
        },
        {
          nickname: 'Tulip',
          species: 'Tulipa',
          h2o_frequency: '1 time per week',
          user_id: 1
        },
        {
          nickname: 'Lavender',
          species: 'Lavandula',
          h2o_frequency: '2 times per week',
          user_id: 1
        },
      ]);
    });
};
