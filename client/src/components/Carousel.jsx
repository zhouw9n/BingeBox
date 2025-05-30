import Card from "./Card";
import "../global.css"

/**
 * Carousel Component
 * 
 * Displays movies/shows in a carousel layout.
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

export default Carousel