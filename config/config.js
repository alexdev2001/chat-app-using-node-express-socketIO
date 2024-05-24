require('dotenv').config()


module.exports = {
    development: {
        username: 'postgres',
        password: 'imani2001',
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    },
    test: {
        username: 'postgres',
        password: 'imani2001',
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres'
    },
}