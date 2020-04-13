module.exports = {
    development: {
      username: "root",
<<<<<<< HEAD
      password: process.env.SEQUELIZE_PASSWORD,
      database: "movie_dinner",
=======
      password: "Tha,bto7",
      database: 'movie_dinner',
>>>>>>> d61e0e22ca683e70592fd8d3f87c25d734a79684
      details: {
        host: "localhost",
        port: 3306,
        dialect: "mysql"
      }
    },
    test: {
      username: "root",
<<<<<<< HEAD
      password: process.env.SEQUELIZE_PASSWORD,
      database: "movie_dinner_test",
=======
      password: "Tha,bto7",
      database: 'movie_dinner',
>>>>>>> d61e0e22ca683e70592fd8d3f87c25d734a79684
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