const express = require('express');
const router = express.Router();

function requireAdmin(req,res,next){
    // Check if the user is authenticated (you should have another middleware for this)
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!req.user.is_admin) {
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }

    // User is authenticated and is an admin, proceed to the next middleware or route handler
    next();
}
router.post('/create-parking', requireAdmin, async (req, res) => {
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
router.post('/delete-parking',requireAdmin, async (req, res) => {
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
router.post('/update-parking', requireAdmin, async (req, res) => {
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
router.post('/parking-zones', requireAdmin, async (req, res) => {
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
router.post('/parking-history', requireAdmin, async (req, res) => {
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
module.exports=router