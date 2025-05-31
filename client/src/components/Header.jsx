import { isFavorites, addToFavorites, removeFromFavorites } from "../services/favorites";
import { useEffect, useState } from "react";
import "../global.css"

/**
 * Header Component
 * 
 * Displays the main header section on the movie/show details page
 * including poster image, basic information about the movie/show and interactive buttons.
 * 
 * Handles:
 * - Add to favorites
 * - Watch trailer via provide YouTube link
 *  
 */
function Header({details, category, id}) {
    const [favorites, setFavorites] = useState(false);
        
        
    useEffect(() => {
        const isFavoritesValue = isFavorites(id, category);
        setFavorites(isFavoritesValue);
    },[id, category]);
    
    function handleFavorite() {
        if (favorites) {
            setFavorites(false);
            removeFromFavorites(id.toString(), category);
        } else {
            setFavorites(true);
            addToFavorites(id.toString(), category);
        }
    }

    return (
        <div className="inset-shadow-[#101018] inset-shadow-sm flex xs:flex-row flex-col justify-center items-center sm:gap-5 md:gap-12 bg-[var(--secondary-color)] shrink-0">
            {/* === Poster === */}
            <img 
                src={`https://image.tmdb.org/t/p/w500/${details.posterUrl}`} 
                alt="Image" 
                className="w-[300px] sm:w-[336px] lg:w-[500px] h-auto"
                loading="lazy"
                />
            
            {/* === Info === */}
            <div className="flex flex-col md:justify-between py-4 w-[300px] sm:w-[336px] lg:w-[500px]">
                <h1 className="font-semibold text-[20px]">{details.title}</h1>
                <p>{`(${details.releaseYear})`}</p>
                <p className="pt-8 pb-2 overflow-hidden">{details.description}</p>
                <div className="flex gap-4">
                    <div className="flex gap-2">
                        <i className="bi bi-star-fill"></i>
                        <p>{details.rating}</p>
                    </div>
                    <div className={`${details.pg ? "flex" : "hidden"} justify-center items-center rounded-[5px] w-[32px] bg-[var(--accent-color)]`}>
                        <p className="text-[var(--text-color-secondary)]">PG</p>
                    </div>
                </div>
                
                {/* === Favorite and Trailer Buttons === */}
                <div className="flex gap-6 pt-8">
                    <button
                    onClick={handleFavorite} 
                    title="Add to favorites" 
                    className="group flex justify-center items-center hover:bg-[var(--primary-color)] rounded-[5px] w-[32px] transition-colors duration-300 ease-in bg-[var(--accent-color)] cursor-pointer">
                        <i className={`${favorites ? "bi bi-star-fill text-[var(--secondary-accent-color)]" : "bi bi-star text-[var(--text-color-secondary)] group-hover:text-[var(--font-color-primary)]"}`}></i>
                    </button>
                    <a 
                    href={`https://www.youtube.com/watch?v=${details.trailerUrlKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Watch Trailer on Youtube"
                    className="flex justify-center gap-4 hover:bg-[var(--primary-color)] px-[10px] py-[5px] rounded-[5px] hover:text-[var(--font-color-secondary)] text-[var(--text-color-secondary)] align-middle transition-colors duration-300 ease-in bg-[var(--accent-color)] cursor-pointer"
                    >
                        <i className="bi bi-play-circle-fill"></i>
                        <p>Watch Trailer</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header