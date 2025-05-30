import { useEffect, useState } from "react";
import { getFavorites } from "../services/favorites";
import { getDetails } from "../services/api";
import { clearSearchInput } from "../utils/clearSearchInput";
import Card from "../components/Card";

function Favorites() {
    const [favorites, setFavorites] = useState(getFavorites());
    const [details, setDetails ] = useState([]);

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
        }

        clearSearchInput();
        fetchDetails();
    }, [favorites]);

    const handleFavoriteRemoved = () => {
        setFavorites(getFavorites());
    }


    return (
        <div className="flex justify-center px-[4vw] py-16">
            <div className="place-items-center gap-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] w-full max-w-[2560px]">
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