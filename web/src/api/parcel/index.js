import axios from 'axios';

export async function getAllParcels() {
  try {
    const { data } = await axios.get('http://localhost:4006/parcel/list');
    return data;
  } catch (error) {
    console.error({ error });
    return [];
  }
}

export async function createOneParcel(parcel) {
  try {
    const { data } = await axios.post(`http://localhost:4006/parcel`, parcel);
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function updateOneParcel(parcel) {
  try {
    const { data } = await axios.put(`http://localhost:4006/parcel/${parcel.external_id}`, parcel);
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function deleteOneParcel(parcel) {
  try {
    console.log('delete one parcel', { parcel });
    const { data } = await axios.delete(`http://localhost:4006/parcel/${parcel.external_id}`);
    console.log({ deleteOneData: data });
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function deleteParcels(parcels) {
  let resultingParcels = parcels;
  try {
    for (const parcel of parcels) {
      const res = await deleteOneParcel(parcel);
      if (res) {
        resultingParcels = res;
      }
    }
  } catch (error) {
    console.error({ error });
  }
  console.log({ resultingParcels });
  return resultingParcels;
}

export default { getAllParcels, createOneParcel, updateOneParcel, deleteOneParcel, deleteParcels };
