const express = require('express');
const pool = require('./pool');
const session = require('express-session');
const usersRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: true
    })
  );
app.use("/user", usersRoutes)
app.use("/admin", adminRoutes)

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});