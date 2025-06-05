import { useEffect, useState } from "react"
import { GENRE_MAP_SHOWS } from "../constants/genreMap";
import { getShowsByGenre } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Carousel from "../components/Carousel"
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Shows Page
 * 
 * Handles:
 * - Fetches and displays a preview of shows in different genres.
 * 
 * Components Rendered:
 * - Carousel: A carousel for each fetched genre.
 * 
 */
function Shows() {
    window.scrollTo(0, 0);
    // Setting state.
    const [genreShows, setGenreShows] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorCode, setErrorCode] = useState(null);

    // Handles fetching shows from each genre.
    useEffect(() => {
        const fetchAllGenres = async () => {
            const promises = GENRE_MAP_SHOWS.map(async (genre) => {
                try {
                    const shows = await getShowsByGenre(genre.id);
                    return { [genre.name]: shows.results };
                } catch (error) {
                    console.log(error.status, error.message);
                    setErrorCode(error.status);
                    setIsError(true);
                }
            });

            const results = await Promise.all(promises);
            const combined = Object.assign({}, ...results);
            setGenreShows(combined);
            setIsLoading(false);
        };

        clearSearchInput();
        fetchAllGenres();
    }, []);

    // Renders error message.
    if (isError) return <ErrorMessage code={errorCode} />

    // Renders loading animation.
    if (isLoading) return <Loader message="Loading shows"/>

    return (
        <>
        {GENRE_MAP_SHOWS.map((genre) => {
            const shows = genreShows[genre.name];

            if (!shows) return null;

            return (
                <Carousel key={genre.name} label={genre.name} items={shows} type="tv"/>
            )
        })}
        </>
    )
}

export default Shows