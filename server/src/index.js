const app = require('express')();
const bodyParser = require('body-parser');
const parcelRepo = require('./repository/parcel-repository');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/parcel/list', (req, res) => {
  const parcels = parcelRepo.getAll();
  console.log({ parcels });
  return res.json(parcels);
});

app.get('/parcel/:id', (req, res) => {
  const parcelId = req.params.id;
  console.log({ parcelToFetch: parcelId });
  const parcel = parcelRepo.getOne(parcelId);
  if (parcel) {
    return res.json(parcel);
  } else {
    res.statusCode = 404;
    res.json({ message: `Error, parcel ${parcelId} not found` });
  }
});

app.post('/parcel', (req, res) => {
  const parcel = req.body;
  console.log({ body: parcel });

  const created = parcelRepo.createOne(parcel);

  if (created) {
    res.statusCode = 201;
  } else {
    res.statusCode = 409; // resource already exists
  }
  const parcels = parcelRepo.getAll();
  res.json(parcels);
});

app.put('/parcel/:id', (req, res) => {
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

app.delete('/parcel/:id', (req, res) => {
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

const port = process.env.PORT || 4006;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`));
