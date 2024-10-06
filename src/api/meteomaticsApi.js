// Resources
// Documentation: https://www.meteomatics.com/en/api/getting-started/
// URL Creator: https://meteomatics.com/url-creator/
import axios from 'axios';

const createBasicAuthToken = (username, password) => {
  const token = btoa(username + ':' + password);
  return `Basic ${token}`;
};

function getNearestPastQuarterHour() {
  const now = new Date();
  const minutes = now.getMinutes();
  const roundedMinutes = Math.floor(minutes / 15) * 15;
  
  now.setMinutes(roundedMinutes);
  now.setSeconds(0);
  now.setMilliseconds(0);
  
  // Format the date as per the specified format
  const offset = -now.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const offsetMinutes = String(absOffset % 60).padStart(2, '0');
  
  return now.toISOString().slice(0, 19) + `.000${sign}${offsetHours}:${offsetMinutes}`;
}

const meteomaticsApiClient = axios.create({
  baseURL: process.env.REACT_APP_METEOMATICS_API_ENDPOINT,
  headers: {
    'Authorization': createBasicAuthToken(process.env.REACT_APP_METEOMATICS_API_USERNAME, process.env.REACT_APP_METEOMATICS_API_PASSWORD),
    'Content-Type': 'application/json', // Adjust as necessary
  },
});
// https://api.meteomatics.com/2024-10-06T11:30:00.000+02:00/t_-150cm:C,soil_moisture_index_-150cm:idx,precip_3h:mm/44.8872071,11.0661063/json?model=mix

const getMeteomaticsData = async ({ lat, long }) => {
  try {
    const date = getNearestPastQuarterHour();
    const { data } = await meteomaticsApiClient.get(`/${date}/t_-150cm:C,soil_moisture_index_-150cm:idx,precip_3h:mm,global_rad:W/${lat},${long}/json?model=mix`);
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