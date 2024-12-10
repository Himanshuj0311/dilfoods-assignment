const express = require('express');
const MenuItem = require('../models/MenuItem');
const authenticate = require('../middleware/auth');
const router = express.Router();

// Create Menu Item
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, price, category, availability } = req.body;
    const menuItem = new MenuItem({ name, price, category, availability });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Menu Items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Menu Item
router.put('/:id', authenticate, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Menu Item
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
