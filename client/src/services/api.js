/**
 * API Services handles all HTTP request to the backend via Render. 
 */

import { addToFavorites } from "./favorites";

const BASE_URL = "https://bingebox-nzb9.onrender.com";


/**
 * Fetches trending movies and tv shows.
 * 
 * @returns {Promise<Array>} - Trending content or empty array on failure.
 */
export const getTrendingList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/trending/all`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Failed to get trending." ,error);
  }
}

/**
 * Fetches upcoming movies.
 * 
 * @returns {Promise<Array>} - Upcoming movies or empty array on failure.
 */
export const getUpcomingMoviesList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/movie/upcoming`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Failed to get upcoming movies." ,error);
  }
}

/**
 * Fetches detailed information about a movie or tv show.
 * Requires category as TMDB API provides two different API fetches,
 * one for movie and one for shows.
 * 
 * @param {string} category - Either "movie" or "tv".
 * @param {string} id - TMDB ID of the content.
 * @returns {Promies<Object>} - Object with details of movie or tv show, or null on failure.
 */
export const getDetails = async (category, id) => {
  
    try {
    if (category === "movie") {
      const response = await fetch(`${BASE_URL}/api/movie/details?id=${id}`);
      const data = await response.json();
      return data;
    } else if (category === "tv") {
      const response = await fetch(`${BASE_URL}/api/tv/details?id=${id}`);
      const data = await response.json();
      return data;
    } else {
      console.log(`Invalid category: ${category}`);
      return null;
    }
  } catch (error) {
    console.log(`Failed to get details of ${id}`, error);
    return null;
  }
}

/**
 * Fetches movie by genre ID.
 * 
 * @param {string} id - TMDB genre ID. 
 * @returns {Promise<Array>} - Array of movies from a genre or empty array on failure.
 */
export const getMoviesByGenre = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/movie/genre?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to get movies by genre.", error);
  }
}

/**
 * Fetches shows by genre ID.
 * 
 * @param {string} id - TMDB genre ID. 
 * @returns {Promise<Array>} - Array of shows from a genre or empty array on failure.
 */
export const getShowsByGenre = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/tv/genre?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to get shows by genre.", error);
  }
}

/**
 * Fetches search results based on query.
 * 
 * @param {string} query - Users search query.
 * @returns {Promise<Array>} - Array of movies or shows matching the query or empty array on failure.
 */
export const getSearchResults = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search?query=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to get search resutls.", error);
    return null;
  }
}







export const getUserRecommendation = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/api/datastrax`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression: query}),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Error couldn't get similarity sample from Datastrax DB: ", error)
  }
} 