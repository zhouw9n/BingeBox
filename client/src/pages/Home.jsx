import { useEffect, useState } from "react";
import { getTrendingList, getUpcomingMoviesList, getUserRecommendation, getDetails } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import { getFavorites } from "../services/favorites";
import { buildSample } from "../utils/buildSample";
import Carousel from "../components/Carousel";
import React from "react";


function Home() {

    const [trendingList, setTrendingList] = useState([]);
    const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
    const [userRecommendations, setUserRecommendations] = useState([]);

    const [isTrendingLoading, setTrendingLoading] = useState(true);
    const [isUpcomingLoading, setUpcomingLoading] = useState(true);
    const [isRecsLoading, setRecsLoading] =  useState(true);

    useEffect(() => {

        const fetchTrending = async () => {
            const results = await getTrendingList();
            setTrendingList(results || []);
            setTrendingLoading(false);
        };    

        const fetchUpcomingMoviesList = async () => {
            const results = await getUpcomingMoviesList();
            
            const today = new Date();
            const filteredList = results?.filter(movie => {
                if (!movie.release_date) return false;

                const releaseDate = new Date(movie.release_date);
                return releaseDate > today;
            });
            setUpcomingMoviesList(filteredList || []);
            setUpcomingLoading(false);
        };

        const fetchUserRecommendation = async () => {
            const favorites = getFavorites();
            const favoritesSample = favorites.length <= 5
            ? favorites
            : favorites.slice(-5);

            const descriptions = favoritesSample.map(item => item.description);
            if (!descriptions || descriptions.length === 0) {
                setRecsLoading(false);
                return;
            };
            
            const query = buildSample(descriptions);
            
            const results = await getUserRecommendation(query);
            const favoriteKeys = new Set(favorites.map(item => `${item.category}:${item.id}`));
            const filteredResults = results.filter(item => !favoriteKeys.has(`${item.type}:${item.tmdbid}`));

            const details = async() => {
                const promises = filteredResults.slice(0, 20).map(async (item) => {
                    try {
                        const result = await getDetails(item.type, item.tmdbid);
                        const data = Object.assign({}, result, { media_type: item.type});
                        return data;
                    } catch (error) {
                        console.log(`Failed to fetch ${item.type} with ID: ${item.tmdbid}`, error);
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

    useEffect(() => {
        console.log(userRecommendations);
    },[userRecommendations]);

    
    if (isTrendingLoading || isUpcomingLoading || isRecsLoading) {
        return <></>
    }

    return (
        <>
        {userRecommendations && userRecommendations.length > 0 && (
             <Carousel label="Based on your favorites" items={userRecommendations}/>
        )} 
        <Carousel label="Trending" items={trendingList}/>
        <Carousel label="Upcoming Movies" items={upcomingMoviesList} type="movie"/>
        </>
    )
}

export default React.memo(Home)

