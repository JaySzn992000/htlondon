// config.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-twilight-frog-addghbvs-pooler.c-2.us-east-1.aws.neon.tech",
  database: "neondb",
  password: "npg_9HdagToMF5Jx",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;