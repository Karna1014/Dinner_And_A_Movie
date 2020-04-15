
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
      username: "plmx0qiehm7wtmi2",
      password: "ey0hhustegyf4gvh",
      database: "jtigcrv340pl4jjs",
      host: "cig4l2op6r0fxymw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mysql"
    }
    // production: {
    //   'use_env_variable': 'JAWSDB_URL',
    //   details: {
    //     dialect: "mysql"
    //   }
    // }
  };
