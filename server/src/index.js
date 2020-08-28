const app = require('express')();
var cors = require('cors');
const bodyParser = require('body-parser');

const { PARCEL_ROUTE, RETAILER_ROUTE, CUSTOMER_ROUTE } = require('./utils/routeConstants');
const parcelController = require('./controller/parcel-controller');
const retailerController = require('./controller/retailer-controller');
const customerController = require('./controller/customer-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(PARCEL_ROUTE, parcelController);
app.use(RETAILER_ROUTE, retailerController);
app.use(CUSTOMER_ROUTE, customerController);

const port = process.env.PORT || 4006;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`));
