import { useEffect, useState } from "react";
import { getTrendingList, getUpcomingMoviesList, getUserRecommendation, getDetails } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import { getFavorites } from "../services/favorites";
import { buildSample } from "../utils/buildSample";
import Carousel from "../components/Carousel";
import React from "react";
import "../global.css";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Home Page
 * 
 * Handles:
 * - Fetches movies and shows which are currently trending this week.
 * - Fetches upcoming movies.
 * - Fetches personalized user recommendations via vector search from a database based on user's favorites.
 * 
 * Components Rendered:
 * - Carousel: A carousel displaying personalized recoomendations, currently trending and upcoming movies.
 */
function Home() {
    window.scrollTo(0, 0);
    // Settign states.
    const [trendingList, setTrendingList] = useState([]);
    const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
    const [userRecommendations, setUserRecommendations] = useState([]);
    const [isTrendingLoading, setTrendingLoading] = useState(true);
    const [isUpcomingLoading, setUpcomingLoading] = useState(true);
    const [isRecsLoading, setRecsLoading] =  useState(true);

    // Handles fetching trending, upcoming movies and user recommendations
    useEffect(() => {

        const fetchTrending = async () => {
            try {
                const results = await getTrendingList();
                setTrendingList(results || []);
            } catch (error) {
                console.log (error.status, error.message);
                setTrendingList([]);
            } finally {
                setTrendingLoading(false);
            }
        };    

        const fetchUpcomingMoviesList = async () => {
            try {
            const results = await getUpcomingMoviesList();
            // Filter movies, only upcoming movies after today's date will be displayed.
            // TMDB API will also display past release movies when calling the API.
            const today = new Date();
            const filteredList = results?.filter(movie => {
                if (!movie.release_date) return false;

                const releaseDate = new Date(movie.release_date);
                return releaseDate > today;
            });
            setUpcomingMoviesList(filteredList || []);
            } catch (error) {
                console.log(error.status, error.message);
                setUpcomingMoviesList([]);
            } finally {
                setUpcomingLoading(false);
            }
        };

        const fetchUserRecommendation = async () => {
            const favorites = getFavorites();

            // Extracting last 5 titles added to favorites.
            const favoritesSample = favorites.length <= 5
            ? favorites
            : favorites.slice(-5);

            // Cancel fetching user recommendation if no descriptions are available.
            const descriptions = favoritesSample.map(item => item.description);
            if (!descriptions || descriptions.length === 0) {
                setRecsLoading(false);
                return;
            };

            // Build sample query for vector search.
            const query = buildSample(descriptions);
            const results = await getUserRecommendation(query);

            // Filter out titles already saved in favorites.
            const favoriteKeys = new Set(favorites.map(item => `${item.category}:${item.id}`));
            const filteredResults = results.filter(item => !favoriteKeys.has(`${item.type}:${item.tmdbid}`));

            // Fetch detailed info for top 20 recommendations.
            const details = async() => {
                const promises = filteredResults.slice(0, 20).map(async (item) => {
                    try {
                        // API call getDetails requires type = "movie" ov "tv" and id to determine which fetch to make.
                        // TMDB seperates APIs between movie and tv.
                        const result = await getDetails(item.type, item.tmdbid);
                        // TMDB API doesn't include key media_type which is needed to route the page properly to the details page.
                        // Details page extracts type and id from URL to call getDetails.
                        const data = Object.assign({}, result, { media_type: item.type});
                        return data;
                    } catch (error) {
                        console.log(error.status, error.message);
                        setUserRecommendations([]);
                        setRecsLoading(false);
                    }
                });
                const results = await Promise.all(promises);
                setUserRecommendations(results.filter(Boolean));
                setRecsLoading(false);
            }

            details();
        }
        
        clearSearchInput();
        fetchUserRecommendation();
        fetchTrending();
        fetchUpcomingMoviesList();
    }, []);
    
    // Renders error message.
    if (!isTrendingLoading && trendingList.length === 0) return <ErrorMessage code={""}/>

    // Renders loading animation.
    if (isTrendingLoading || isUpcomingLoading || isRecsLoading) return <Loader message={"Binge mode loading"}/>
    

    return (
        <>
        {userRecommendations.length > 0 && (
             <Carousel label="Based on your favorites" items={userRecommendations}/>
        )} 
        <Carousel label="Trending" items={trendingList}/>
        {upcomingMoviesList.length > 0 && (
            <Carousel label="Upcoming Movies" items={upcomingMoviesList} type="movie"/>
        )}
        </>
    )
}

export default React.memo(Home)

