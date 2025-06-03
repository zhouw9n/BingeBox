import { useEffect, useState } from "react"
import { GENRE_MAP_MOVIES } from "../constants/genreMap";
import { getMoviesByGenre } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Carousel from "../components/Carousel"

/**
 * Movies Page
 * 
 * Handles:
 * - Fetches and displays a preview of movies in different genres.
 * 
 * Components Rendered:
 * - Carousel: A carousel for each fetched genre.
 * 
 */
function Movies() {
    // Setting state.
    const [genreMovies, setGenreMovies] = useState({});

    // Handles fetching movies from each genre.
    useEffect(() => {
        const fetchAllGenres = async () => {
            const promises = GENRE_MAP_MOVIES.map(async (genre) => {
                try {
                    const movies = await getMoviesByGenre(genre.id);
                    return { [genre.name]: movies.results };
                } catch (error) {
                    console.log(`Failed to fetch ${genre.name}:`, error);
                }
            });

            const results = await Promise.all(promises);
            const combined = Object.assign({}, ...results);
            setGenreMovies(combined);
        };

        clearSearchInput();
        fetchAllGenres();
    }, []);

    return (
        <>
        {GENRE_MAP_MOVIES.map((genre) => {
            const movies = genreMovies[genre.name];

            if (!movies) return null;

            return (
                <Carousel key={genre.name} label={genre.name} items={movies} type="movie"/>
            )
        })}
        </>
    )
}

export default Movies