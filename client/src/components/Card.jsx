import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToFavorites, isFavorites, removeFromFavorites } from "../services/favorites";
import React from "react";
import "../global.css"

/**
 * Card Component
 * 
 * Displays a movie/show as an interactive card.
 * 
 * Handles;
 * - Routing to movie/show details page.
 * - Add movie/show to favorites
 *  
 */
function Card({item, type, onFavoriteRemoved}) {
    // Release year can be under release_date (movies) or first_air_date (tv shows)
    const year = item.release_date || item.first_air_date
    // Determine media category:
    // Use media_type from API if provided, otherwise fall back to the provided prop
    const category = item.media_type ? item.media_type : type;

    const [favorites, setFavorites] = useState(false);
    
    
    useEffect(() => {
        const isFavoritesValue = isFavorites(item.id, category);
        setFavorites(isFavoritesValue);
    },[item.id, category]);

    function handleFavorite() {
        if (favorites) {
            setFavorites(false);
            removeFromFavorites(item.id.toString(), category);
            onFavoriteRemoved?.();
        } else {
            setFavorites(true);
            addToFavorites(item.id.toString(), category);
        }
    }

    // Handles router navigation or add movie/show to favorites
    const navigate = useNavigate();
    function handleClick(event) {
        if (event.target.closest("[data-button-favorites]")) {
            handleFavorite();
            return;
        }
        // Add category "movie" or "tv" and ID to the URL, then navigate to the details page
        // e.g., /movie/12345 or /tv/12345
        navigate(`/${category}/${item.id}`); 
    }

    return (
        
        <div 
        onMouseDown={handleClick}
        data-id={`${item.id}`} 
        data-catagory={`${category}`} 
        title={`${item.title || item.name}`} 
        className="group relative flex flex-col flex-shrink-0 pt-4 pb-6 w-[220px] md:hover:scale-[1.05] transition-transform duration-200 ease-in cursor-pointer">
            {/* === Favorite Button Overlay === */}
            <button
            data-button-favorites
            title="Add to favorites" 
            className="top-[25px] right-[10px] absolute flex justify-center items-center bg-[rgba(34,34,39,0.5)] md:opacity-0 group-hover:opacity-100 border-[var(--secondary-color)] border-2 rounded-full w-[32px] h-[32px] transition-opacity duration-300 ease-in cursor-pointer">
                <i className={`text-[1rem] ${ favorites ? "bi bi-star-fill text-[var(--secondary-accent-color)]" : "bi bi-star"}`}></i>
            </button>

            {/* === Poster === */}
            <div className="flex w-[220px] h-[330px]">
                <img 
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}  
                alt="Image" 
                className="rounded-t-[15px]"
                loading="lazy"
                />
                
            </div>

            {/* === Titel, Release Year and PG  === */}
            <div className="flex flex-col justify-between bg-[var(--secondary-color)] px-[15px] py-[15px] rounded-b-[15px] w-[220px] h-[85px]">
                <p className="font-medium truncate" >{item.title || item.name}</p>
                <div className="flex justify-between">
                    <p>{year?.split("-")[0]}</p>
                    <div className={`bg-[var(--accent-color)] text-[var(--text-color-secondary)] rounded-[5px] w-[24px] text-center font-normal ${item.adult ? "block" : "hidden"}`}>
                        <p>PG</p>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default React.memo(Card)