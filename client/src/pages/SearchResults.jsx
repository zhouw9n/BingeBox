import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchResults } from "../services/api";
import Card from "../components/Card";

/**
 * Search Results Page
 * 
 * Handles:
 * - Fetches search results based on user's search query.
 * - Renders empty state if no search results return.
 * - Handles removing item from favorites. 
 * 
 * Components Rendered:
 * - Card: A card of each movie or show in a grid layout.
 */
function SearchResults () {
    // Extract search query from route parameters to fetch search results.
    const {query} = useParams();
    // Setting state.
    const [searchResults, setSearchResults] = useState([]);
    // Handels fetching search results.
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const data = await getSearchResults(query);
                const filteredData = data.results.filter(item => item.media_type !== "person");
                setSearchResults(filteredData);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchSearchResults();
    },[query]);

    // Callback, triggers when users removes a favorited item.
    const handleFavoriteRemoved = () => {
        setFavorites(getFavorites());
    }

    //// Renders empty state message if no favorites exist.
    if (!searchResults || searchResults.length === 0) {
        return (
            <div className="flex justify-center items-center w-[100%] h-[90dvh]">
                <div className="flex flex-col gap-4 py-[25%]">
                    <h4 className="text-2xl text-center">No Results</h4>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center px-[4vw] py-16">
            <div className="place-items-center gap-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] w-full max-w-[2560px]">
                {searchResults.map((item) => {
                    if (!item) {
                        console.log("Error: Couldn't find item or category.")
                        return null;
                    }
                    
                    return (
                        <Card 
                            key={`${item.media_type}${item.id}`} 
                            item={item} 
                            type={item.media_type} 
                            onFavoriteRemoved={handleFavoriteRemoved}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults