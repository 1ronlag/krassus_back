const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.PASS,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
});

module.exports = {pool}
