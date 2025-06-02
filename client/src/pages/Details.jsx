import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getDetails } from "../services/api";
import { formatDetails } from "../utils/formatData";
import Header from "../components/Header";
import DetailsSection from "../components/DetailsSection";
import ImageCarousel from "../components/ImageCarousel";
import Carousel from "../components/Carousel";
import { clearSearchInput } from "../utils/clearSearchInput";



function Details() {
    const {category, id} = useParams();
    const [details, setDetails] = useState([]);
    
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
            <ImageCarousel details={details}/>
            <Carousel label="Similar Titels" items={details.recommendations}/> 
        </div>
    )
}

export default Details