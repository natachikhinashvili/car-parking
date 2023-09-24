const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Create a PostgreSQL pool for connecting to the database
const pool = new Pool({
  user: 'app_user',
  host: 'localhost',
  database: 'cars',
  password: 'app_password',
  port: 5432, // Default PostgreSQL port
});

// Create a POST route to add a user
app.post('/register', async (req, res) => {
  try {
    const { name, isadmin, password, cars, balance } = req.body;
    const insertUserQuery = 'INSERT INTO users_car (name, isadmin, password, cars, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, isadmin, password, cars, balance];

    const result = await pool.query(insertUserQuery, values);
    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Could not add user' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});