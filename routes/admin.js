const express = require('express');
const router = express.Router();

router.post('/create-parking', async (req, res) => {
  try{
    const { name, address, cars } = req.body;
    const createpark = 'INSERT INTO parking (name, address, cars) VALUES ($1, $2, $3) RETURNING *'
    const values = [name,address, cars]
    const result = await pool.query(createpark, values)
    const park = result.rows[0];
    res.status(201).json(park);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/delete-parking', async (req, res) => {
  try {
    const {name} = req.body;
    const deleteparkQuery = 'DELETE FROM parking WHERE name = $1';
    const values = [name]
    const result = await pool.query(deleteparkQuery, values)
    const deletedparking = result.rows[0];
    res.status(201).json(deletedparking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/update-parking', async (req, res) => {
  try {
    const {name, cars} = req.body;
    const updateparking = 'UPDATE parking SET cars = $2 WHERE name = $1'
    const values = [name, cars]
    const result = await pool.query(updateparking, values)
    const updatedparking = result.rows[0];
    res.status(201).json(updatedparking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/parking-zones', async (req, res) => {
  try{
    const selectall = 'SELECT * FROM parking_zones'    
    const result = await pool.query(selectall)
    const selected = result.rows[0];
    res.status(201).json(selected);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/parking-history', async (req, res) => {

});
module.exports=router