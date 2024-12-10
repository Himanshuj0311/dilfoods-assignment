const express = require('express');
const Order = require('../models/Order');
const authenticate = require('../middleware/auth');
const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
  try {
    const { customerName, items, totalAmount } = req.body;
    const order = new Order({ customerName, items, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Orders
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Order Status
router.put('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Order
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
