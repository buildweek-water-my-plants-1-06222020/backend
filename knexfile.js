// Update with your config settings.
const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/hobbits";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/plants.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
        filename: "./data/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
        directory: "./data/migrations",
    },
    seeds: {
        directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: "./data/migrations",
    },
    seeds: {
        directory: "./data/seeds",
    },
  }

};
