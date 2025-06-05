import { useEffect, useState } from "react"
import { GENRE_MAP_MOVIES } from "../constants/genreMap";
import { getMoviesByGenre } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Carousel from "../components/Carousel"
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

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
    window.scrollTo(0, 0);
    // Setting state.
    const [genreMovies, setGenreMovies] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorCode, setErrorCode] = useState(null);

    // Handles fetching movies from each genre.
    useEffect(() => {
        const fetchAllGenres = async () => {
            const promises = GENRE_MAP_MOVIES.map(async (genre) => {
                try {
                    const movies = await getMoviesByGenre(genre.id);
                    return { [genre.name]: movies.results };
                } catch (error) {
                    console.log(error.status, error.message);
                    setErrorCode(error.status);
                    setIsError(true);
                }
            });

            const results = await Promise.all(promises);
            const combined = Object.assign({}, ...results);
            setGenreMovies(combined);
            setIsLoading(false);
        };

        clearSearchInput();
        fetchAllGenres();
    }, []);

    // Renders error message.
    if (isError) return <ErrorMessage code={errorCode}/>

    // Renders loading animation.
    if (isLoading) return <Loader message="Loading movies"/>

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