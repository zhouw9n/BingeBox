import Card from "./Card";
import React from "react";
import "../global.css"

/**
 * Carousel Component
 * 
 * Displays movies and shows in a carousel layout.
 * 
 * Props:
 * - label: Sets the titel of the carousel (i.e.: Upcoming Movie, Trending).
 * - items: An object formatted data handed over to the Card component for rendering purposes.
 * - type Either "movie" or "tv" show handed over to the Card component for 
 *  
 */
function Carousel({label, items, type}) {
    return (
        <section className="pt-16 pl-[4vw]">
            <h1 className="text-bold md:text-[20px]">{label}</h1>
            <div className="flex gap-6 md:px-4 md:py-4 overflow-x-scroll scroll-smooth">
                {items?.map((item, index) => (
                    <Card key={index} item={item} type={type}/>
                ))}
            </div>
        </section>
    )
}

export default React.memo(Carousel)