/**
 * API Services handles all HTTP request to the backend via Render. 
 */

const BASE_URL = "https://bingebox-nzb9.onrender.com";


/**
 * Fetches trending movies and tv shows.
 * 
 * @returns {Promise<Array>} - Trending content or empty array on failure.
 */
export const getTrendingList = async () => {
  const response = await fetch(`${BASE_URL}/api/trending/all`);
  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, message: data.error || "Failed to get trending movies and shows."};
  }
  return data.results;
}

/**
 * Fetches upcoming movies.
 * 
 * @returns {Promise<Array>} - Upcoming movies or empty array on failure.
 */
export const getUpcomingMoviesList = async () => {
  const response = await fetch(`${BASE_URL}/api/movie/upcoming`);
  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, message: data.error || "Failed to get upcoming movies."};
  }
  return data.results;
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
    if (category === "movie") {
      const response = await fetch(`${BASE_URL}/api/movie/details?id=${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw { status: response.status, message: data.response || `Failed to get details of movie with id ${id}.`};
      }
      return data;
    } else if (category === "tv") {
      const response = await fetch(`${BASE_URL}/api/tv/details?id=${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw { status: response.status, message: data.error || `Failed to get details of show with id ${id}.`};
      }
      return data;
    } else {
      throw { status: 400, message: `Invalide category: ${category}. Must be "movie" or "tv".`};
    }
}

/**
 * Fetches movie by genre ID.
 * 
 * @param {string} id - TMDB genre ID. 
 * @returns {Promise<Array>} - Array of movies from a genre or empty array on failure.
 */
export const getMoviesByGenre = async (id) => {
    const response = await fetch(`${BASE_URL}/api/movie/genre?id=${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.error || `Failed to get movies with genre id ${id}.`};
    }

    return data;
}

/**
 * Fetches shows by genre ID.
 * 
 * @param {string} id - TMDB genre ID. 
 * @returns {Promise<Array>} - Array of shows from a genre or empty array on failure.
 */
export const getShowsByGenre = async (id) => {  
  const response = await fetch(`${BASE_URL}/api/tv/genre?id=${id}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw { status: response.status, message: data.error || `Failed to get shows with genre id ${id}.`};
  }

  return data;
}

/**
 * Fetches search results based on query.
 * 
 * @param {string} query - Users search query.
 * @returns {Promise<Array>} - Array of movies or shows matching the query or empty array on failure.
 */
export const getSearchResults = async (query) => {
  const response = await fetch(`${BASE_URL}/api/search?query=${query}`);
  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, message: data.error || "Failed to get search results."};
  }

  return data; 
}

/**
 * Fetches personalized user recommendation based on user's favorites..
 * 
 * @param {string} query - query which represents a sample for the vector search.
 * @returns {Promise<Array>} - Array of movies or shows ranked based on vector search.
 */
export const getUserRecommendation = async (query) => {
  const response = await fetch(`${BASE_URL}/api/datastrax`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expression: query}),
  });

  if (!response.ok) {
    throw { status: response.status, message: data.error || "Failed to get user recommendation."};
  }

  const data = await response.json();
  return data;
} 