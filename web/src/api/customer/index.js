import axios from 'axios';

export async function getAllCustomers() {
  try {
    const { data } = await axios.get('http://localhost:4006/customer/list');
    return data;
  } catch (error) {
    console.error({ error });
    return [];
  }
}

export default { getAllCustomers };
