import axios from 'axios';

const fetchData = async (endpoint, authToken) => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData;
