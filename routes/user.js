// Create a POST route to add a user
const express = require('express');
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
      res.redirect('/login');
    }
}

router.post('/add-car', async (req, res) => {
    console.log(req.session)
    const name = req.session.name; // Get the user's ID from the session
  
    try {
  
      // Update the user's password in the database
      await User.update(
        { password: hashedPassword },
        { where: { name: name } }
      );
  
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
router.post('/update-car', async (req, res) => {
    const { newPassword } = req.body;
    console.log(req.session)
    const name = req.session.name; // Get the user's ID from the session
  
    try {
  
      // Update the user's password in the database
      await User.update(
        { password: hashedPassword },
        { where: { name: name } }
      );
  
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
router.post('/delete-car', async (req, res) => {
    console.log(req.session)
    const name = req.session.name; // Get the user's ID from the session
  
    try {
  
      // Update the user's password in the database
      await User.update(
        { password: hashedPassword },
        { where: { name: name } }
      );
  
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
router.post('/park', async (req, res) => {
    console.log(req.session)
    const name = req.session.name; // Get the user's ID from the session
  
    try {
  
      // Update the user's password in the database
      await User.update(
        { password: hashedPassword },
        { where: { name: name } }
      );
  
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
router.post('/update-password', requireAuth, async (req, res) => {
    const { newPassword } = req.body;
    const name = req.session.name; // Get the user's ID from the session
  
    try {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password in the database
      await User.update(
        { password: hashedPassword },
        { where: { name: name } }
      );
  
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
module.exports = router;