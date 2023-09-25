const express = require('express');
const pool = require('../pool');
const session = require('express-session');
const usersRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
app.use(
    session({
      secret: 'secret-key', // Replace with your own secret key
      resave: false,
      saveUninitialized: true,
      // You can configure additional options here
    })
  );
app.use("/user", usersRoutes)
app.use("/admin", adminRoutes)
// Create a PostgreSQL pool for connecting to the database

// Serve your HTML file with a button
app.post('/authorize', async (req, res) => {
    const { name, password } = req.body;

    try {
      // Find the user by username
      const user = await pool.findOne({
        where: { name },
      });
  
      if (user) {
        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          req.session.userId = user.name; // Store user ID in the session
        }
      }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});