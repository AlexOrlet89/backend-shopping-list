const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!item || item.user_id !== req.user.id) {
      throw new Error('YOU DO NOT HAVE ACCESS TO THEPAGE');
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
