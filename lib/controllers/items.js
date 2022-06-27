const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);

      res.send(items);
    } catch (error) {
      next(error);
    }
  });

// TO DO - implement items CRUD
