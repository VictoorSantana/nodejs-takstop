

module.exports = {
    SECRET_KEY: 'thisismysecretkey',
    SECRET_KEY_EXPIRES: '5000s',

    /* DATABASE SETTINGS */
    DATABASE_HOST: 'localhost',
    DATABASE_NAME: 'mydb',
    DATABASE_USER: 'root',
    DATABASE_PASS: 'root123',
    DATABASE_TYPE: 'mysql',
    DATABASE_POOL_MAX: 5,
    DATABASE_POOL_MIN: 0,
    DATABASE_POOL_ACQUIRE: 30000,
    DATABASE_POOL_IDLE: 10000,
    DATABASE_DEFINE_TIMESTAMPS: false,

    /*  */
    INITIAL_ID: 'thisismyinitid:'
    
}
