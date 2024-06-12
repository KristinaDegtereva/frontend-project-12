import axios from 'axios';

const fetchData = async (url, action, token, dispatch) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(action(response.data));
  } catch (e) {
    console.error(e);
  }
};

export default fetchData;
