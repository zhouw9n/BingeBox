
/**
 * Image Carousel Component
 * 
 * Displays images from the movie/show.
 * 
 * Props:
 * - details: An object containing image url paths to render image carousel. 
 */
function ImageCarousel({details}) {
    return (
        <section className="flex justify-center [animation:var(--animate-ease-to)]">
            <div className="flex flex-col justify-center pt-16 w-[300px] xs:w-[692px] sm:w-[336px] md:w-[720px] lg:w-[1020px]">
                
                <div className="flex justify-center w-full">
                    <h1 className="lg:mx-[1vw] xlg:mx-auto pt-8 pb-2 w-[300px] xs:w-[692px] sm:w-[336px] md:w-[720px] lg:w-[1020px] font-bold text-[20px]">Media</h1>  
                </div>

                <div className="flex justify-start gap-4 pt-4 pb-6 overflow-x-auto">
                    {details?.imageUrlPaths?.map((url) => (
                        <img 
                        key={url} 
                        src={`https://image.tmdb.org/t/p/w500/${url}`}
                        className="w-[300px] h-auto object-fill"
                        loading="lazy"
                        />
                    ))}
                </div>
            </div>            
        </section>
    )
}

export default ImageCarousel