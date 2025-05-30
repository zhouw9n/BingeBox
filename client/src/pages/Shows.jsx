import { useEffect, useState } from "react"
import { GENRE_MAP_SHOWS } from "../constants/genreMap";
import { getShowsByGenre } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Carousel from "../components/Carousel"


function Shows() {
    const [genreShows, setGenreShows] = useState({});

    useEffect(() => {
        const fetchAllGenres = async () => {
            const promises = GENRE_MAP_SHOWS.map(async (genre) => {
                try {
                    const shows = await getShowsByGenre(genre.id);
                    return { [genre.name]: shows.results };
                } catch (error) {
                    console.log(`Failed to fetch ${genre.name}:`, error);
                }
            });

            const results = await Promise.all(promises);
            const combined = Object.assign({}, ...results);
            setGenreShows(combined);
        };

        clearSearchInput();
        fetchAllGenres();
    }, []);

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