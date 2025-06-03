import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react"
import "../global.css"

/**
 * Navbar Component
 * 
 * Providing top navigation menu including responsive menu and 
 * search toggle for mobile devices.
 * 
 * Handles:
 * - Mobile dropdown menu.
 * - Search bar toggle (for mobile).
 * - Outside click detection to auto-close dropdowns.
 */
function Navbar() {
    const navigate = useNavigate();
    
    // === Responsive dropdown menu logic ===
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const dropDownRef = useRef(null);
    const toggleRef= useRef(null); 

    useEffect(() => {
        if (!menuOpen) return;

        function handleClicksOutside(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target) &&
                toggleRef && !toggleRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClicksOutside);
        return () => {
            document.removeEventListener("mousedown", handleClicksOutside);
        };
    },[menuOpen]);


    // === Search logic ===
    const inputRef = useRef(null);
    const inputMobileRef = useRef(null);
    const searchButtonRef = useRef(null);
    const searchButtonMobileRef = useRef(null);

    const handleSearch = (event) => {
        // 
        if (inputRef.current.contains(event.target) && event.key !== "Enter" || inputMobileRef.current.contains(event.target) && event.key !== "Enter") {
            inputRef.current.value?.trim() ? inputMobileRef.current.value = event.target.value : "";
            inputMobileRef.current.value?.trim() ? inputRef.current.value = event.target.value : "";
        }
        //
        if (inputRef.current.contains(event.target) && event.key === "Enter" || inputMobileRef.current.contains(event.target) && event.key === "Enter") {
            const query = event.target.value.trim();
            console.log(query);
            event.target.value = "";
            if (searchActive) { setSearchActive(!searchActive) };
            navigate(`/search/${query}`);
        }
        //
        if (searchButtonRef.current.contains(event.target) || searchButtonMobileRef.current.contains(event.target)) {
            const query = inputRef.current.value?.trim() || inputMobileRef.current.value?.trim();
            console.log(query);
            inputRef.current.value = "";
            inputMobileRef.current.value = "";
            if (searchActive) { setSearchActive(!searchActive) };
            navigate(`/search/${query}`);
        }
    }

    return (
        <nav className="h-12">
            <div className="flex justify-between items-center px-[4vw] py-[0.5rem] h-12 md:h-16 text-base">
                {/* === Logo === */}
                <div 
                 onClick={() => navigate("/")} 
                 className="flex gap-2 order-2 md:order-1 cursor-pointer select-none item-center">
                    <div className="size-[20px] md:size-[24px]">
                        <i className="text-[20px] md:text-2xl bi bi-film"></i>
                    </div>
                    <h4 className="font-medium text-[20px] md:text-2xl">BingeBox</h4>
                </div>

                {/* === Desktop Navigation Links === */}
                <div className="hidden md:flex md:justify-evenly md:order-2 md:w-[45%] font-medium md:text-[20px]">
                    <Link className="hover:scale-[1.05] transition-transform duration-200 ease-in" to="/movies">Movies</Link>
                    <Link className="hover:scale-[1.05] transition-transform duration-200 ease-in" to="/shows">Shows</Link>
                    <Link className="hover:scale-[1.05] transition-transform duration-200 ease-in" to="/favorites">Favorites</Link>
                </div>

                {/* === Desktop Search Bar === */}
                <div className="hidden md:flex md:gap-2 md:order-3 pl-[15px] rounded-[15px] text-[var(--text-color-secondary)] md:text-[20px] bg-[var(--accent-color)] cursor-pointer">
                    <input 
                    placeholder="Search..." 
                    className="outline-none min-w-[200px]"
                    onKeyUp={handleSearch}
                    ref={inputRef}
                
                    />
                    <div 
                    className="flex justify-center items-center bg-[var(--primary-color)] pl-[10px] border-[1px] border-[var(--accent-color)] border-l-0 rounded-r-[15px] w-[35px]"
                    onClick={handleSearch}
                    ref={searchButtonRef}
                    >
                        <i className="pr-[15px] text-[var(--text-color-primary)] bi bi-search"></i>
                    </div>
                </div>

            
                {/* === Mobile Menu Toggle Icon === */}
                <div 
                 ref={toggleRef} onClick={() => setMenuOpen(!menuOpen)} 
                 className="md:hidden flex justify-center items-center order-1 size-[20px] cursor-pointer"
                 >
                    <i className={` ${menuOpen ? "bi bi-x-lg text-[20px]" : "bi bi-list text-[24px]"}`}></i>
                </div>

                {/* === Mobile Search Icon === */}
                <div 
                 onClick={() => setSearchActive(!searchActive)} 
                 className="md:hidden order-3 cursor-pointer"
                 >
                    <i className="text-[20px] bi bi-search"></i>
                </div>
            </div>

            {/* === Mobile Dropdown Links === */}
            <div 
             ref={dropDownRef} 
             className={`md:hidden relative z-10 font-medium top-[-1px] flex flex-col items-center w-full left-0 pt-2 bg-[var(--primary-color)] transform transition-transform duration-300 origin-top ${menuOpen ? "scale-y-100" : "scale-y-0"} shadow-xl shadow-[#222231]/50`}>
                <Link onClick={() => setMenuOpen(!menuOpen)} className={`py-2 transition-opacity duration-150 ${menuOpen ? "opacity-100" : "opacity-0"} hover:bg-[var(--secondary-color)] w-full text-center`} to="/shows">Shows</Link>
                <Link onClick={() => setMenuOpen(!menuOpen)} className={`py-2 transition-opacity duration-150 ${menuOpen ? "opacity-100" : "opacity-0"} hover:bg-[var(--secondary-color)] w-full text-center`} to="/movies">Movies</Link>
                <Link onClick={() => setMenuOpen(!menuOpen)} className={`py-2 transition-opacity duration-150 ${menuOpen ? "opacity-100" : "opacity-0"} hover:bg-[var(--secondary-color)] w-full text-center`} to="/favorites">Favorites</Link>
            </div>

            {/* === Mobile Dropdown Search Overlay === */}
            <div 
             onClick={() => setSearchActive(!searchActive)} 
             className={`fixed md:hidden inset-0 z-10 bg-[var(--secondary-color)] backdrop-blur-[40px] transition-opacity duration-300 ease-in ${searchActive ? "opacity-60" : "opacity-0 pointer-events-none"}`}></div>
            
            {/* === Mobile Dropdown Search Bar === */}
            <div className={`md:hidden top-[0.75rem] left-[2%] z-20 flex fixed justify-between gap-2 pl-[15px] rounded-[15px] w-[96vw] h-8 bg-[var(--accent-color)] transform transition-transform duration-400 origin-top ${searchActive ? "translate-z-[4rem]" : "translate-y-[-4rem]"}`}>
                <input 
                 type="text"
                 placeholder="Search..."
                 onKeyUp={handleSearch}
                 
                 ref={inputMobileRef}
                 className="focus:outline-none w-full text-[var(--text-color-secondary)] placeholder:text-[var(--text-color-secondary)] text-base"
                 />

                <div 
                onClick={handleSearch}
                ref={searchButtonMobileRef}
                className="flex justify-center items-center bg-[var(--primary-color)] pl-[10px] border-[1px] border-[var(--accent-color)] border-l-0 rounded-r-[15px] w-[32px]">
                    <i className="pr-[15px] text-[var(--text-color-primary)] bi bi-search"></i>
                </div>
            </div>
        </nav>
    )
}

export default Navbar