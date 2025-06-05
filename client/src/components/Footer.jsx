import {Link} from "react-router-dom";

/**
 * Footer Component
 * 
 * Renders the footer on the bottom of the page.
 */
function Footer() { 

    return(
        <footer className="bg-[var(--secondary-color)]">

            <div className="bg-[var(--primary-color)] rounded-b-[50px] h-[96px]"></div>

            <div className="px-[4vw] py-8">
                <div className="flex md:flex-row flex-col md:justify-between md:items-end gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-nowrap gap-2">
                            <i className="text-2xl bi bi-film"/>
                            <h4 className="text-2xl">BingeBox</h4>
                        </div>
                        <p className="font-light text-[20px]">Find it. Binge it. Love it!</p>
                    </div>
                    <div className="flex md:flex-row flex-col gap-2 md:gap-8 lg:gap-16 text-[20px]">
                        <Link className="hover:cursor-pointer" to="/">Home</Link>
                        <Link className="hover:cursor-pointer" to="/movies">Movies</Link>
                        <Link className="hover:cursor-pointer" to="/shows">Shows</Link>
                        <Link className="hover:cursor-pointer" to="/favorites">Favorites</Link>
                    </div>

                    <a 
                        href="https://github.com/zhouw9n/BingeBox" 
                        target="_blank" rel="noopener noreferrer" 
                        title="GitHub Repository"
                        className="text-[20px]"
                        >
                            Github
                    </a>
                </div>
                <p className="pt-8 font-light text-center">Provided by 
                        <a className="font-semibold" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"> TMDB</a>
                    </p>
            </div>
        </footer>
    )
} 

export default Footer