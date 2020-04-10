module.exports = {
    development: {
      username: "root",
      password: "~KC70giresun",
      database: 'movie_dinner',
      details: {
        host: "localhost",
        port: 3306,
        dialect: 'mysql'
      }
    },
    test: {
      username: "root",
      password: "~KC70giresun",
      database: 'movie_dinner_test',
      details: {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        logging: false
      }
    },
    production: {
      'use_env_variable': 'JAWSDB_URL',
      details: {
        dialect: 'mysql'
      }
    }
  };