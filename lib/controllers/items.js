const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
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
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      res.json(Item.delete(id));
    } catch (error) {
      next(error);
    }
  });

// TO DO - implement items CRUD
