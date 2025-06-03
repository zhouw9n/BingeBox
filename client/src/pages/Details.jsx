import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getDetails } from "../services/api";
import { formatDetails } from "../utils/formatData";
import Header from "../components/Header";
import DetailsSection from "../components/DetailsSection";
import ImageCarousel from "../components/ImageCarousel";
import Carousel from "../components/Carousel";
import { clearSearchInput } from "../utils/clearSearchInput";


/**
 * Details Page
 * 
 * Handles:
 * - Fetches and displays detailed information aboout a movie or show
 * 
 * Components Rendered:
 * - Header: Poster with main title and preview area.
 * - DetailsSection: Metadata and other relevant information.
 * - ImageCarousel: A preview of images.
 * - Carousel: Recommend similar titles base on this movie/show the user is looking at.
 * 
 */
function Details() {
    // Extract category and id from route parameters to fetch details.
    const {category, id} = useParams();

    // Setting state.
    const [details, setDetails] = useState([]);
    
    // Handles fetchig details about the movie or show.
    useEffect(() => {
        const fetchDetails = async() => {
            const response = await getDetails(category, id);
            const formatted = formatDetails(response);
            setDetails(formatted);
            window.scrollTo(0, 0);
        }
        clearSearchInput(); 
        fetchDetails();
        
    },[category,id]);

    const isLoading = details.length === 0;
    if (isLoading) {
        return <></>
    }
    
    return (
        <div className="md:py-[1rem]">
            <Header details={details} category={category} id={id}/>

            <DetailsSection details={details} category={category}/>
            { details.imageUrlPaths && details.imageUrlPaths.length > 0 && (
                <ImageCarousel details={details}/>
            )}

            { details.recommendations && details.recommendations.length > 0 && (
                <Carousel label="Similar Titels" items={details.recommendations}/>
            )}
             
        </div>
    )
}

export default Details