const express = require('express');
const router = express.Router();

const parcelRepo = require('../repository/parcel-repository');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(`(${req.method}) ${req.originalUrl} ${new Date().toISOString()}`);
  next();
});

router.get('/list', (req, res) => {
  const parcels = parcelRepo.getAll();
  return res.json(parcels);
});

router.get('/:id', (req, res) => {
  const parcelId = req.params.id;
  const parcel = parcelRepo.getOne(parcelId);
  if (parcel) {
    return res.json(parcel);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, parcel ${parcelId} not found` });
  }
});

router.post('/', (req, res) => {
  const parcel = req.body;

  const created = parcelRepo.createOne(parcel);

  if (created) {
    res.statusCode = 201;
  } else {
    res.statusCode = 409; // resource already exists
  }
  const parcels = parcelRepo.getAll();
  res.json(parcels);
});

router.put('/:id', (req, res) => {
  const parcel = req.body;
  const parcelId = req.params.id;
  parcel.external_id = parcelId;
  const updated = parcelRepo.updateOne(parcel);

  if (updated) {
    res.statusCode = 200;
    res.json(updated);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, parcel ${parcelId} not found` });
  }
});

router.delete('/:id', (req, res) => {
  const parcelId = req.params.id;
  const updated = parcelRepo.removeOne(parcelId);

  if (updated) {
    res.statusCode = 200;
    res.json(updated);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, parcel ${parcelId} not found` });
  }
});

module.exports = router;
