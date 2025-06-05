import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getDetails } from "../services/api";
import { formatDetails } from "../utils/formatData";
import Header from "../components/Header";
import DetailsSection from "../components/DetailsSection";
import ImageCarousel from "../components/ImageCarousel";
import Carousel from "../components/Carousel";
import { clearSearchInput } from "../utils/clearSearchInput";
import Loader from "../components/Loader";


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
    window.scrollTo(0, 0);
    // Extract category and id from route parameters to fetch details.
    const {category, id} = useParams();

    // Setting state.
    const [details, setDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Handles fetchig details about the movie or show.
    useEffect(() => {
        setIsLoading(true);
        const fetchDetails = async() => {
            try {
                const response = await getDetails(category, id);
                const formatted = formatDetails(response);
                setDetails(formatted);
            } catch (error) {
                console.log(`Error fetching ${category} details: `, error);
                setIsLoading(false);
                //Add error UI error message
            } finally {
                setIsLoading(false);
            }
        }

        clearSearchInput(); 
        fetchDetails();
        
    },[category,id]);

    // Renders loading animation.
    if (isLoading) return <Loader message={"Loading details"}/>
    
    
    return (
        <div className="py-[1rem]">
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