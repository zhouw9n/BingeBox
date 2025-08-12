import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

function App() {


  

  return (
    <>
      <NavBar/>
      <main>  
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
