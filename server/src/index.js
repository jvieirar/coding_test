const app = require('express')();
const bodyParser = require('body-parser');

const { PARCEL_ROUTE } = require('./utils/routeConstants');
const parcelController = require('./controller/parcel-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(PARCEL_ROUTE, parcelController);

const port = process.env.PORT || 4006;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`));
