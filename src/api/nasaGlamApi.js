import axios from 'axios';

// Initialize axios client with base NASA API endpoint
const nasaApiClient = axios.create({
  baseURL: process.env.REACT_APP_NASA_GLAM_API_ENDPOINT,
});

// Model Constants
const VEGETATION_INDEX_MODEL = 'mod09q1-ndvi';
const WATER_INDEX_MODEL = 'mod09a1-ndwi';

// Generic function to get data for a point
const getPointData = async ({ model, date, lat, long }) => {
  try {
    const { data } = await nasaApiClient.get(`/point/${model}/${date}/${lat}/${long}/`);
    return data;
  } catch (error) {
    console.log(`Error fetching point data: ${error.message}`);
    throw error; // Re-throw the error to propagate it up
  }
};

// Function to fetch Water Index data
export const getWaterIndex = async ({ date, lat, long }) => {
  try {
    return await getPointData({ model: WATER_INDEX_MODEL, date, lat, long });
  } catch (error) {
    console.log('Failed to retrieve Water Index data.');
    throw error;
  }
};

// Function to fetch Vegetation Index data
export const getVegetationIndex = async ({ date, lat, long }) => {
  try {
    return await getPointData({ model: VEGETATION_INDEX_MODEL, date, lat, long });
  } catch (error) {
    console.log('Failed to retrieve Vegetation Index data.');
    throw error;
  }
};

// Function to get the most recent Vegetation Index data
export const getLastVegetationIndex = async ({ lat, long }) => {
  try {
    const lastDate = await getLastDate({ model: VEGETATION_INDEX_MODEL });
    return await getPointData({ model: VEGETATION_INDEX_MODEL, date: lastDate, lat, long });
  } catch (error) {
    console.log('Failed to retrieve the latest Vegetation Index data.');
    throw error;
  }
};

// Function to get the latest available date for a model
export const getLastDate = async ({ model }) => {
  try {
    const { data } = await nasaApiClient.get(`/datasets/?limit=10000&product_id=${model}/`);
    return data.pop();
  } catch (error) {
    console.log('Failed to retrieve the latest date for the model.');
    throw error;
  }
};
