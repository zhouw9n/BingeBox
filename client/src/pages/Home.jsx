import { useEffect, useState } from "react";
import { getRecommendations, getAverageVectors, getTrendingList, getUpcomingMoviesList } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Carousel from "../components/Carousel";
import { getFavorites } from "../services/favorites";

function Home() {

    const [trendingList, setTrendingList] = useState([]);
    const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
    const [personalizedRecommendations, setPersonalizedRecommendations] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const results = await getTrendingList();
            setTrendingList(results || []);
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
        };
        const fetchPersonalizedRecommendations = async () => {
            const favorites = getFavorites();
            const descriptions = favorites.map(item => item.description);
            console.log(descriptions);
            const averageVector = await getAverageVectors(descriptions);
            console.log(JSON.stringify(averageVector));
            const personalizedRecommendations = await getRecommendations(averageVector);
            setPersonalizedRecommendations(personalizedRecommendations);
        }
        
        clearSearchInput();
        fetchTrending();
        fetchUpcomingMoviesList();
        fetchPersonalizedRecommendations();
    }, []);

    useEffect(() => {
        console.log(personalizedRecommendations);
    },[personalizedRecommendations]);

    const isLoading = trendingList.length === 0 && upcomingMoviesList.length === 0;
    if (isLoading) {
        return <></>
    }

    return (
        <>
        <Carousel label="Trending" items={trendingList}/>
        <Carousel label="Upcoming Movies" items={upcomingMoviesList} type="movie"/>
        </>
    )
}

export default Home