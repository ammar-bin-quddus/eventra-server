const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  createEvent,
  getEvents,
  joinEvent,
  getMyEvents,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', verifyToken, createEvent);
router.put('/join/:id', verifyToken, joinEvent);
router.get('/mine', verifyToken, getMyEvents);
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
