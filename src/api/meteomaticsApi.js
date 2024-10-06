// Resources
// Documentation: https://www.meteomatics.com/en/api/getting-started/
// URL Creator: https://meteomatics.com/url-creator/
import axios from 'axios';

const createBasicAuthToken = (username, password) => {
  const token = btoa(username + ':' + password);
  return `Basic ${token}`;
};

const meteomaticsApiClient = axios.create({
  baseURL: process.env.REACT_APP_METEOMATICS_API_ENDPOINT,
  headers: {
    'Authorization': createBasicAuthToken(process.env.REACT_APP_METEOMATICS_API_USERNAME, process.env.REACT_APP_METEOMATICS_API_PASSWORD),
    'Content-Type': 'application/json', // Adjust as necessary
  },
});
// https://api.meteomatics.com/2024-10-06T11:30:00.000+02:00/t_-150cm:C,soil_moisture_index_-150cm:idx,precip_3h:mm/44.8872071,11.0661063/json?model=mix

const getMeteomaticsData = async ({ date, lat, long }) => {
  try {
    const { data } = await meteomaticsApiClient.get(`/2024-10-06T11:30:00.000+02:00/t_-150cm:C,soil_moisture_index_-150cm:idx,precip_3h:mm/${lat},${long}/json?model=mix`);
    return data;
  } catch (error) {
    console.log('Failed to retrieve data.');
    throw error;
  }
}

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

export { getMeteomaticsData, getTemperature };