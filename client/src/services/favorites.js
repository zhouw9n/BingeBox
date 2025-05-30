/**
 * LocalStorage API Services for managing user's favorite movies and shows.
 * Each favorite is stored with an `id` and `category` 
 * (i.e.: { id: "123", category: "movie" }).
 */


const FAVORITES_KEY = "favorites";


/**
 * Retrieves all favorite items from localStorage.
 * 
 * @returns {Array} - Array of favorite items, each with an `id` and `category`.
 */
export const getFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return favorites;
}

/**
 * Checks if an item is already in favorites based on its Id and category.
 * 
 * @param {string} id - The ID of the movie or show. 
 * @param {string} category - The categry, either "movie" or "tv". 
 * @returns {boolean} - Returns `true` if the item exists in favorites, otherwise `false`.
 */
export const isFavorites = (id, category) => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return favorites?.some(item => item.id.toString() === id.toString() && item.category === category);
}

/**
 * Adds an item to the favorites list if it doesn't already exist.
 * 
 * @param {string} id - The ID of the movie or show.
 * @param {string} category - The category, either "movie" or "tv".
 */
export const addToFavorites = (id, category) => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    const alreadyExists = favorites?.some(item => item.id.toString() === id.toString() && item.category === category);
    if (alreadyExists) return;

    const addToFavorites = { id, category};
    const updatedFavorites = [...favorites, addToFavorites];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
}

/**
 * Removes an item from the favorites list based on its ID and category.
 * 
 * @param {string} id - The ID of the movie or show.
 * @param {string} category - The category, either "movie" or "tv".
 */
export const removeFromFavorites = (id, category) => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    const updatedFavorites = favorites.filter(item => !(item.id.toString() === id.toString() && item.category === category));
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
}