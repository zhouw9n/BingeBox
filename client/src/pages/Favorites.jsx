import { useEffect, useState } from "react";
import { getFavorites } from "../services/favorites";
import { getDetails } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Card from "../components/Card";
import Loader from "../components/Loader";

/**
 * Favorites Page
 * 
 * Handles:
 * - Loading of user favorites from localStorage.
 * - Fetches details to render Card.
 * - Handles removing item from favorites. 
 * - Renders empty state if no search results return.
 * 
 * Components Rendered:
 * - Card: A card of each movie or show in a grid layout.
 */
function Favorites() {
    window.scrollTo(0, 0);
    // Setting states.
    const [favorites, setFavorites] = useState(getFavorites());
    const [details, setDetails ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Handles fetching details about the movie or show.
    useEffect(() => {
        const fetchDetails = async () => {
            const promises = favorites.map(async (item) => {
                try {
                    const details = await getDetails(item.category, item.id.toString());
                    return {
                        item: details,
                        category: item.category,
                        id: item.id
                    };
                } catch (error) {
                    console.log(error);
                }
            });

            const results = await Promise.all(promises);
            const combined = Object.assign([...results]);
            setDetails(combined);
            setIsLoading(false);
        }

        clearSearchInput();
        fetchDetails();
    }, [favorites]);

    // Callback, triggers when users removes a favorited item.
    const handleFavoriteRemoved = () => {
        setFavorites(getFavorites());
        setIsLoading(true);
    }

    // Renders loading animation.
    if(isLoading) return <Loader message={"Loading favorites"}/>

    // Renders empty state message if no favorites exist.
    if (!favorites || favorites.length === 0) {
        return(
            <div className="flex justify-center items-center w-[100%] h-[90dvh]">
                <div className="flex flex-col gap-4 py-[25%]">
                    <h4 className="text-2xl text-center">No Favorites</h4>
                    <p className="text-center">Start by adding movies or shows.</p>
                </div>
                
            </div>
        )
    }


    return (
        <div className="flex justify-center px-[4vw] py-16">

            {/* === Card Grid === */}
            <div className="place-items-center gap-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] w-full max-w-[2560px] [animation:var(--animate-ease-to)]">
            {details.map(({item, category, id}) => {
                if (!item || !category) {
                    console.log("Error: Couldn't find item or category.")
                    return null;
                }
                return (
                    <Card 
                        key={`${category}${id}`} 
                        item={item} 
                        type={category} 
                        onFavoriteRemoved={handleFavoriteRemoved}
                    />
                )
            })}
            </div>
        </div>
    )
}

export default Favorites