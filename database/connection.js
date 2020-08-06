const Sequelize = require('sequelize');

const { DATABASE_HOST, DATABASE_NAME, 
        DATABASE_PASS, DATABASE_TYPE, 
        DATABASE_USER, DATABASE_POOL_ACQUIRE,
        DATABASE_POOL_IDLE, DATABASE_POOL_MAX,
        DATABASE_POOL_MIN, DATABASE_DEFINE_TIMESTAMPS } = require('../properties/setup');

module.exports = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASS, {
    host: DATABASE_HOST,
    dialect: DATABASE_TYPE,
    define: {
        timestamps: DATABASE_DEFINE_TIMESTAMPS
    },
    pool: {
        max: DATABASE_POOL_MAX,
        min: DATABASE_POOL_MIN,
        acquire: DATABASE_POOL_ACQUIRE,
        idle: DATABASE_POOL_IDLE
      }
});
  

