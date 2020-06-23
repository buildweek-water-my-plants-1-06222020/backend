const db = require('../data/dbConnection.js')

module.exports = {
  find,
  findByID,
  findPlantsByUserID,
  add,
  update,
  remove,
  login
}


function find() {
  return db('users')
    .select(
      'users.id',
      'users.username',
      'users.phone_number'
    )
}


function findByID(id) {
  return db('users')
    .select(
      'users.id',
      'users.username',
      'users.phone_number'
    )
    .where({'id': id})
    .first()
}


function findPlantsByUserID(id) {
  return db('plants')
    .select(
      'plants.id AS plant_id',
      'plants.nickname',
      'plants.species',
      'plants.h2o_frequency',
      'plants.img_url',
      'users.username AS user'
    )
    .where({'plants.user_id': id})
    .join('users', 'users.id', 'plants.user_id')
    .orderBy('plants.id')
}


function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(id => {
      return findByID(id[0])
    })
}


function update(id, changes) {
  return db('users')
    .where({'id': id})
    .update(changes)
    .then(updated => {
      return findByID(id)
    })
}


function remove(id) {
  return db('users')
    .where({'id': id})
    .delete()
}


function login(username) {
  return db('users')
    .select(
      'users.id',
      'users.username',
      'users.phone_number',
      'users.password'
    )
    .where({'username': username})
    .first()
}