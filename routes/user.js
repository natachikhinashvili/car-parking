// Create a POST route to add a user
const express = require('express');
const pool = require('../pool');
const router = express.Router();

router.post('/register', async (req, res) => {
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
function requireAuth(req, res, next) {
    if (req.session.userId) {
      // The user is authenticated, so continue to the next middleware/route
      next();
    } else {
      // The user is not authenticated, so redirect to the login page (or handle as needed)
      res.redirect('/authorize');
    }
}

router.post('/add-car', requireAuth, async (req, res) => {
  try{
    const { name, type, country_code, parking } = req.body;
    const inserCarQuery = 'INSERT INTO cars_table (name, type, country_code, parking) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [name,type,country_code,parking]
    const result = await pool.query(inserCarQuery, values)
    const newCar = result.rows[0];
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});
router.post('/update-car',requireAuth, async (req, res) => {
    try {
      const {name, type, country_code, parking} = req.body;
      const updateCarQuery = 'UPDATE cars SET name = $1, type = $2, country_code = $3, parking = $4 WHERE name = $1 RETURNING *';
      const values = [name,type,country_code,parking]
      const result = await pool.query(updateCarQuery, values)
      const updatedCar = result.rows[0];
      res.status(201).json(updatedCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.post('/delete-car', requireAuth, async (req, res) => {
    try {
      const {name} = req.body;
      const deletecarQuery = 'DELETE FROM cars WHERE name = $1';
      const values = [name]
      const result = await pool.query(deletecarQuery, values)
      const deletedcar = result.rows[0];
      res.status(201).json(deletedcar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.post('/update-password', requireAuth, async (req, res) => {
    try {
      const {name, password} = req.body;
      const updatepasswordquery = 'UPDATE users_car SET password = $2 WHERE name = $1'
      const values = [name, password]
      const result = await pool.query(updatepasswordquery, values)
      const updatedpassword = result.rows[0];
      res.status(201).json(updatedpassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;