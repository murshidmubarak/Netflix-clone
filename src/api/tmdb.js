import axios from "axios";

// For Vite - use import.meta.env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  return response.data.results;
};

export const fetchTopRated = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  return response.data.results;
};

export const fetchActionMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}`
  );
  return response.data.results;
};

export const fetchComedyMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}`
  );
  return response.data.results;
};

export const fetchMovieTrailer = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return response.data.results;
};