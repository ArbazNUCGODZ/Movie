import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/theaters'; // Adjust the base URL as needed

export const getTheatersPune = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pune`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theaters in Pune:', error);
    throw error;
  }
};

export const getTheatersBanglore = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bangalore`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theaters in Bangalore:', error);
    throw error;
  }
};

export const getTheatersMumbai = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mumbai`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theaters in Mumbai:', error);
    throw error;
  }
};

export const getTheatersDelhi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/delhi`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theaters in Delhi:', error);
    throw error;
  }
};
