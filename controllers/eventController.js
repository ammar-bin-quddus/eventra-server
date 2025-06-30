const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, name, date, time, location, description } = req.body;

  try {
    const event = new Event({
      title,
      name,
      date,
      time,
      location,
      description,
      createdBy: req.userId,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1, time: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.joinEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.attendeeCount += 1;
    await event.save();
    res.json({ message: 'Joined event', event });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join event' });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your events' });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOneAndUpdate(
      { _id: id, createdBy: req.userId },
      req.body,
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.userId });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
