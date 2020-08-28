import axios from 'axios';

export async function getAllRetailers() {
  try {
    const { data } = await axios.get('http://localhost:4006/retailer/list');
    return data;
  } catch (error) {
    console.error({ error });
    return [];
  }
}

export async function createOneRetailer(retailer) {
  try {
    const { data } = await axios.post(`http://localhost:4006/retailer`, retailer);
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export default { getAllRetailers, createOneRetailer };
