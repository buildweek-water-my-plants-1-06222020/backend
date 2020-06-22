const knex = require('knex');

const knexFile = require('../knexfile.js');

const environment = process.env.DB_ENV || "development"

module.exports = knex(knexFile[environment])