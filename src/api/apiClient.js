import axios from 'axios';

const createBasicAuthToken = (username, password) => {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
};

const apiClient = axios.create({
  headers: {
    Authorization: createBasicAuthToken(
      process.env.REACT_APP_METEOMATICS_API_USERNAME,
      process.env.REACT_APP_ETEOMATICS_API_PASSWORD,
    ),
    'Content-Type': 'application/json',
  },
});

export default apiClient;
