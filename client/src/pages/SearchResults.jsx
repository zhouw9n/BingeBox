import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchResults } from "../services/api";
import Card from "../components/Card";


function SearchResults () {
    const {query} = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const data = await getSearchResults(query);
                setSearchResults(data.results);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchSearchResults();
    },[query]);

    

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
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults