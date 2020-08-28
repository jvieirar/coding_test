const express = require('express');
const router = express.Router();

const parcelService = require('../service/parcel-service');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(`(${req.method}) ${req.originalUrl} ${new Date().toISOString()}`);
  next();
});

router.get('/list', (req, res) => {
  const parcels = parcelService.getAllParcels();
  return res.json(parcels);
});

router.get('/:id', (req, res) => {
  const parcelId = req.params.id;
  const parcel = parcelService.getOneParcel(parcelId);
  if (parcel) {
    return res.json(parcel);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, parcel ${parcelId} not found` });
  }
});

router.post('/', (req, res) => {
  const parcel = req.body;

  const created = parcelService.createOneParcel(parcel);

  if (created) {
    res.statusCode = 201;
    const parcels = parcelService.getAllParcels();
    res.json(parcels);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, retailer or customer not found` });
  }
});

router.put('/:id', (req, res) => {
  const parcel = req.body;
  const parcelId = req.params.id;
  parcel.external_id = parcelId;
  const updated = parcelService.updateOneParcel(parcel);

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
  const removed = parcelService.removeOneParcel(parcelId);

  if (removed) {
    res.statusCode = 200;
    res.json(removed);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, parcel ${parcelId} not found` });
  }
});

module.exports = router;
