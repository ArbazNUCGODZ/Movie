import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/movies'; // Adjust the base URL as needed

// Fetch movie details by ID
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Fetch popular movies
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/popular`);
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Fetch movies based on a search query
export const getSearchQueryMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search query movies:', error);
    throw error;
  }
};

// Fetch top-rated movies
export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-rated`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    throw error;
  }
};

// Fetch trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Fetch upcoming movies
export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};
