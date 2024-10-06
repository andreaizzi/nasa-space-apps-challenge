// Resources
// Documentation: https://www.meteomatics.com/en/api/getting-started/
// URL Creator: https://meteomatics.com/url-creator/

const { default: axios } = require("axios");

const createBasicAuthToken = (username, password) => {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
};

const meteomaticsApiClient = axios.create({
  baseURL: process.env.REACT_APP_METEOMATICS_API_ENDPOINT,
  headers: {
    'Authorization': createBasicAuthToken(process.env.REACT_APP_METEOMATICS_API_USERNAME, process.env.REACT_APP_METEOMATICS_API_PASSWORD),
    'Content-Type': 'application/json', // Adjust as necessary
  },
});

const getTemperature = async ({ date, lat, long }) => {
  try {
    //const { data } = await meteomaticsApiClient.get(`/weather/temperature_2m:C/${date}/${lat},${long}/json`);
    const { data } = await meteomaticsApiClient.get(`/2024-10-05T21:05:00.000+02:00/t_2m:C/${lat},${long}/json?model=mix`);
    return data;
  } catch (error) {
    console.log('Failed to retrieve temperature data.');
    throw error;
  }
}