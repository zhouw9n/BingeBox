/**
 * Utilities for formating raw movie or tv show details from TMDB API into a structured object
 * for user-friendly display on the UI giving the user more information about
 * the movie or tv show.
 * 
 * Handles cases where movie details and tv details coming from two different API links 
 * can have different keys to access the same value (i.e.: movies = "original_title" or shows = "name").
 * 
 * @param {Object} details - Raw movie or tv shows details from TMDB API 
 * @returns {Object} - Formatted details including title, release year, rating, cast, etc.
 */
export const formatDetails = (details) => {
    if (!details) return {};

    const title = details.original_title || details.name; 
    
    const description = details.overview;
    const pg = details.adult;
    const rating = details.vote_average.toFixed(1);

    const releaseDateIsoFormat = details.release_date || details.first_air_date;
    const releaseYear = releaseDateIsoFormat.split("-")[0];
    const releaseDateGlobalFormat = convertDateToGlobalFormat(releaseDateIsoFormat);

    const genres = details.genres;
    const genreList = genres.map(item => item.name);
    
    const countryCodes = details.origin_country;
    const originCountryList = convertCountryCode(countryCodes);

    const languageCode = details.original_language;
    const originLanguage = convertLanguageCode(languageCode);

    const runtimeInMinutes = details.runtime || details.last_episode_to_air?.runtime || "N/A";
    const duration = formatToHoursMinutes(runtimeInMinutes);

    const posterUrl = details.poster_path;

    const videoResults = details.videos.results;
    const trailerUrlKey = findOfficialTrailer(videoResults);

    const images = details.images.backdrops;
    const imageUrlPaths = getImageUrlPaths(images);

    const cast = details.credits.cast;
    const crew = details.credits.crew;
    const castList = findActors(cast);
    const directorsList = findDirectors(crew);

    const creators = details.created_by?.map(creator => creator.name) || ["N/A"];

    const recommendations = details.recommendations.results;

    return {
        posterUrl,
        title,
        description,
        pg,
        rating,
        releaseYear,
        releaseDateGlobalFormat,
        genreList,
        originCountryList,
        originLanguage,
        duration,
        posterUrl,
        trailerUrlKey,
        imageUrlPaths,
        directorsList,
        castList,
        creators,
        recommendations
    }
}

/**
 * Finds the official YouTube trailer in a list of video results.
 * 
 * @param {Array} videoResults - Array of video objects from TMDB API.
 * @returns {string} - YouTube video key of the official trailer, or an empty string
 */
function findOfficialTrailer(videoResults) {
    const video = videoResults.find(video =>
        video.name.includes("Official Trailer") &&
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true
    );
    return video ? video.key : ""; 
}

/**
 * Extracts up to 4 image file paths from the provided backdrop images.
 * 
 * @param {Array} images - Array of backdrop images sorted from highest to lowest popularity from TMDB API.
 * @returns {Array} - Array of image paths.
 */
function getImageUrlPaths(images) {
    return images
    .slice(0, 4)
    .map(image => image.file_path);
}

/**
 * Converts runtime in minutes to a human-readable string in the format "HH:MM".
 * 
 * @param {string} runtimeInMinutes - Runtime in minutes provided by TMDB API.
 * @returns {string} - Formatted duration (i.e.: "1h 30min" or "45min")
 */
function formatToHoursMinutes(runtimeInMinutes) {
    if (runtimeInMinutes === "N/A") return runtimeInMinutes;
    const totalMinutes = Number(runtimeInMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours !== 0 ? `${hours}h ${minutes}min`: `${minutes}min`;
}

/**
 * Converts two-letter country codes provided in ISO 3166 format to a human-readable string.
 * 
 * @param {string} countryCodes - Two-letter country code (i.e.: US) provided by TMDB API.
 * @returns {string} - Country (i.e. United States).
 */
function convertCountryCode(countryCodes) {
    const displayName = new Intl.DisplayNames(["en"], {type: "region"});
    return  countryCodes.map(code => displayName.of(code));
}

/**
 * Converts two-letter language codes provided in ISO 639-1 format to a human-readable string.
 * 
 * @param {string} languageCode - Two-letter language code (i.e.: EN) provided by TMDB API.
 * @returns {string} - Language (i.e.: English).
 */
function convertLanguageCode(languageCode) {
    const displayName = new Intl.DisplayNames(["en"], {type: "language"});
    return displayName.of(languageCode);
}


/**
 * Converts date provided in ISO 8601 format to a human-readable string.
 * 
 * @param {string} releaseDateIsoFormat - Date in UTC (i.e.: 2025-05-30) provided by TMDB API.
 * @returns {string} - Formatted date (i.e.: 30-05-2025).
 */
function convertDateToGlobalFormat(releaseDateIsoFormat) {
    const globalFormat = new Intl.DateTimeFormat("en-GB");
    return globalFormat.format(new Date(releaseDateIsoFormat));
}

/**
 * Filters and provides up to 3 directors sorted by popularity.
 * 
 * @param {Array} crew - Array of the crew provided by TMDB API.
 * @returns {Array} - Array of director names or N/A as fall back.
 */
function findDirectors(crew) {
    const filteredDirectors = crew.filter(crew => crew.job === "Director"); 
    if (filteredDirectors.length > 0) {
        return filteredDirectors
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 3)
        .map(directors => directors.name);
    }
    return ["N/A"];
}


/**
 * Filters and provides up to 5 actors sorted by popularity.
 * 
 * @param {Array} cast - Array of the cast provided by TMDB API. 
 * @returns {Array} - Array of actor/actress names or N/A as fall back.
 */
function findActors(cast) {
    const filteredActors = cast.filter(cast => cast.known_for_department === "Acting");

    if (filteredActors.length >= 1) {
        return filteredActors
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5)
        .map(actors => actors.name);
    }

    return ["N/A"]
}