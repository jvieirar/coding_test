const { dbPath, getInstance, saveData } = require('../db/db');
const data = getInstance();

function _saveParcelsData(parcelsData) {
  saveData({ ...data, parcels: parcelsData });
}

function getAll() {
  return data['parcels'] || [];
}

function getOne(externalId) {
  const parcel = data['parcels'].find((parcel) => parcel.external_id === externalId);
  // TODO: explain what's the difference between return parcel and return {...parcel} and why the UI shows empty retailer and email for return parcel
  // return parcel;
  return { ...parcel };
}

function createOne(parcel) {
  // {
  //   "id": 1,
  //   "external_id": "PP00042",
  //   "customer": 1,
  //   "retailer": 1
  // }
  const parcels = data['parcels'];
  if (!getOne(parcel.external_id)) {
    parcels.push(parcel);
    _saveParcelsData(parcels);
    return true;
  }
  return false;
}

function updateOne(parcel) {
  let existingParcel = getOne(parcel.external_id);
  if (!existingParcel) {
    return null;
  }
  const parcels = data['parcels'];
  const updatedParcels = parcels.map((p) => {
    if (p.external_id === parcel.external_id) {
      return { ...p, ...parcel };
    }
    return p;
  });
  _saveParcelsData(updatedParcels);
  return { ...existingParcel, ...parcel };
}

function removeOne(parcelId) {
  let existingParcel = getOne(parcelId);
  if (!existingParcel) {
    return null;
  }
  const updatedParcels = data['parcels'].filter((parcel) => parcel.external_id !== parcelId);
  _saveParcelsData(updatedParcels);
  return updatedParcels;
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  removeOne,
};
