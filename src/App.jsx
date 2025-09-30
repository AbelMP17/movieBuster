// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500">
        <Navbar />
        
        {/* Página principal */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/series/:id" element={<SeriesDetail />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
}
