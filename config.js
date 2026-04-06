
const { Pool } = require("pg");

const pool = new Pool({
user: "neondb_owner",
host: "ep-gentle-moon-adw63t5d-pooler.c-2.us-east-1.aws.neon.tech",
database: "neondb",
password: "npg_NU8udI2iTSLt",
port: 5432,
ssl: {
rejectUnauthorized: false
}
});

module.exports = pool;