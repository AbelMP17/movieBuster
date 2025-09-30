// src/components/DynamicHero.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function DynamicHero() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`),
          fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`),
        ]);

        const moviesData = await moviesRes.json();
        const seriesData = await seriesRes.json();

        const movieImages = moviesData.results.slice(0, 5).map(item => ({
          id: item.id,
          desktop: item.backdrop_path,
          mobile: item.poster_path,
        }));

        const seriesImages = seriesData.results.slice(0, 3).map(item => ({
          id: item.id,
          desktop: item.backdrop_path,
          mobile: item.poster_path,
        }));

        setBackgrounds([...movieImages, ...seriesImages]);
      } catch (error) {
        console.error("Error cargando imágenes del Hero:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [backgrounds, currentIndex]);

  const current = backgrounds[currentIndex];
  const previous = prevIndex !== null ? backgrounds[prevIndex] : null;

  const getImageUrl = (img, type = "desktop") =>
    img?.[type]
      ? `https://image.tmdb.org/t/p/${type === "desktop" ? "original" : "w500"}${img[type]}`
      : "";

  return (
    <section className="relative flex items-center justify-center text-center min-h-screen overflow-hidden bg-black text-white">
      {/* Imagen anterior (fade out) */}
      {previous && (
        <>
          {/* Desktop */}
          <img
            src={getImageUrl(previous, "desktop")}
            alt=""
            className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-out pointer-events-none"
            key={`prev-desktop-${previous.id}`}
          />
          {/* Mobile */}
          <img
            src={getImageUrl(previous, "mobile")}
            alt=""
            className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-out pointer-events-none"
            key={`prev-mobile-${previous.id}`}
          />
        </>
      )}

      {/* Imagen actual (fade in) */}
      {current && (
        <>
          {/* Desktop */}
          <img
            src={getImageUrl(current, "desktop")}
            alt=""
            className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-100 animate-fade-in pointer-events-none"
            key={`current-desktop-${current.id}`}
          />
          {/* Mobile */}
          <img
            src={getImageUrl(current, "mobile")}
            alt=""
            className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-100 animate-fade-in pointer-events-none"
            key={`current-mobile-${current.id}`}
          />
        </>
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

      {/* Contenido */}
      <div className="relative z-20 px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Bienvenido a MovieBuster
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-gray-300 mb-10">
          Tu portal definitivo para descubrir información actualizada sobre tus
          películas y series favoritas. ¡Busca, explora y prepárate para tu
          próxima maratón!
        </p>
        <Link
          to="/movies"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
        >
          Buscar ahora
        </Link>
      </div>
    </section>
  );
}
