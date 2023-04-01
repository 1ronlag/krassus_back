const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.PGPASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,   
    allowExitOnIdle: true
});

module.exports = {pool}
