const express = require('express');
const BaseRepository = require('../repository/BaseRepository');

function createCrudApi(entityClass) { 
  const router = express.Router();
  const repo = new BaseRepository(entityClass);

  //?criteria=...&limit=...&offset=...
  router.get('/', async (req, res) => {
    console.log(222);
    try { 
      const { criteria, limit, offset, order } = req.query;

      const parsedOrder = order
        ? order.split(',').map((o) => {
            const [field, dir] = o.trim().split(':');
            return { field, direction: dir || 'asc' };
          })
        : [];

      const results = await repo.criteria(criteria || '1=1', {
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
        order: parsedOrder,
      });

      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const entity = await repo.create(req.body);
      res.status(201).json(entity);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updated = await repo.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await repo.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createCrudApi;
