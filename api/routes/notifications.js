const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const notification = new Notification({
      toSend: req.body.toSend,
      from: req.body.from,
      text: req.body.text
    });
    await notification.save();
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating notification' });
  }
});

// Get all notifications for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ toSend: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Get a single notification by ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
    } else {
      res.json(notification);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching notification' });
  }
});

// Update a notification
router.patch('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
    } else {
      res.json(notification);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating notification' });
  }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndRemove(req.params.id);
    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting notification' });
  }
});

// Mark a notification as read
router.patch('/read/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { $set: { read: true } }, { new: true });
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
    } else {
      res.json(notification);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error marking notification as read' });
  }
});

module.exports = router;