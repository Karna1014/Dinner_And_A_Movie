module.exports = {
    development: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "movie_dinner",
      details: {
        host: "localhost",
        port: 3306,
        dialect: "mysql"
      }
    },
    test: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "movie_dinner_test",
      details: {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
        logging: false
      }
    },
    production: {
      'use_env_variable': 'JAWSDB_URL',
      details: {
        dialect: "mysql"
      }
    }
  };