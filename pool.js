const { Pool } = require('pg');

const pool = new Pool({
    user: 'app_user',
    host: 'localhost',
    database: 'cars',
    password: 'app_password',
    port: 5432, // Default PostgreSQL port
  });
  
module.exports = pool