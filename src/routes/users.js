const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../db/queries');

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;