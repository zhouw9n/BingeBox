
/**
 * Details Section Component
 * 
 * Displays structured information about a movie or show.
 * 
 * Props:
 * - details: An object containing formatted data (i.e.: duration, release date, genres, cast).
 * - category: Either "movie" or "tv" to conditionally render category-specific info.
 */
function DetailsSection({details,category}) {
    return (
        <>
            <div className="flex justify-center w-full [animation:var(--animate-ease-to)]">
                <h1 className="lg:mx-[1vw] xlg:mx-auto py-8 w-[300px] xs:w-[692px] sm:w-[336px] md:w-[720px] lg:w-[1020px] font-bold text-[20px]">Details</h1>
            </div>   
            <div className="flex xs:flex-row flex-col sm:justify-between items-center xs:items-start sm:mx-auto lg:mx-[1vw] xlg:mx-auto w-full xs:w-[692px] md:w-[720px] lg:w-[1020px] [animation:var(--animate-ease-to)]">
                {/* === Section Left === */}
                <section className="flex flex-col gap-6 w-[300px] sm:w-[336px] lg:w-[400px] whitespace-nowrap">
                    <div className="flex justify-between">
                        <p className="font-semibold text-left whitespace-nowrap">Type:</p>
                        <p className="w-[35%] break-words">{category === "movie" ? "Movie" : "Series"}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-semibold whitespace-nowrap">Duration:</p>
                        <p className="w-[35%] break-words">{details.duration}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="items-end font-semibold whitespace-nowrap">Release Date:</p>
                        <p className="w-[35%] break-words">{details.releaseDateGlobalFormat}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-semibold whitespace-nowrap">Origin Language:</p>
                        <p className="w-[35%] break-words">{details.originLanguage}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-semibold whitespace-nowrap">Origin Country:</p>
                        <div className="flex flex-col w-[35%] whitespace-break-spaces">
                            {details?.originCountryList?.map((country) => (
                                <p key={country}>{country}</p>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-semibold whitespace-nowrap">Genres:</p>
                        <div className="flex flex-col w-[35%]">
                            {details?.genreList?.map((genre) => (
                                <p key={genre}>{genre}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === Section Right === */}
                <section className="flex flex-col gap-8 pt-8 xs:pt-0">
                    {category === "movie" && (
                        <div className="flex justify-between w-[300px] sm:w-[336px] lg:w-[400px]">
                        
                            <p className="font-semibold whitespace-nowrap">Directed By:</p>
                            <div className="flex flex-col gap-2 w-[35%] whitespace-break-spaces">
                                {details?.directorsList?.map((director) => (
                                    <p key={director}>{director}</p>
                                ))}
                            </div>
                        </div>        
                    )}

                    {category === "tv" && (
                        <div className="flex justify-between w-[300px] sm:w-[336px] lg:w-[400px]">
                        
                            <p className="font-semibold whitespace-nowrap">Creators:</p>
                            <div className="flex flex-col gap-2 w-[35%] whitespace-break-spaces">
                                {details?.creators?.map((creator) => (
                                    <p key={creator}>{creator}</p>
                                ))}
                            </div>
                        </div>        
                    )}
                    

                    <div className="flex justify-between w-[300px] sm:w-[336px] lg:w-[400px]">
                        <p className="font-semibold whitespace-nowrap">Cast:</p>
                        <div className="flex flex-col gap-2 w-[35%] whitespace-break-spaces">
                            {details?.castList?.map((cast) => (
                                <p key={cast}>{cast}</p>
                            ))}
                        </div>
                    </div>                 
                </section>
            </div>
            
        </>
    )
}

export default DetailsSection

