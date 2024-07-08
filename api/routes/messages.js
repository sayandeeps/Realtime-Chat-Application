const router = require('express').Router();
const Message = require('../models/Message');

//add a message
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get messages
router.get('/:conversationId', paginatedResults(Message), async (req, res) => {
    try {
      res.status(200).json(res.paginatedResults);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // middleware function to paginate response
  function paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
      if (endIndex < await model.countDocuments({ conversationId: req.params.conversationId }).exec()) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
  
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
  
      try {
        results.results = await model
          .find({ conversationId: req.params.conversationId })
          .sort({ createdAt: -1 }) // Sort by creation time in ascending order
          .limit(limit)
          .skip(startIndex)
          .exec();
  
        res.paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }

module.exports = router;