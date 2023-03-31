const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    password: process.env.PASS,
    database: process.env.DATABASE,
    allowExitOnIdle: true
});

module.exports = {pool}
