// src/components/MovieCard.jsx
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const {
    title,
    name,
    overview,
    poster_path,
    release_date,
    first_air_date,
    id,
  } = movie;
  const location = useLocation();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=Sin+imagen";

  const mediaType =
    movie.media_type || (location.pathname.includes("series") ? "tv" : "movie");
  const detailPath = mediaType === "tv" ? `/series/${id}` : `/movie/${id}`;

  const favorite = isFavorite(id, mediaType);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id, mediaType);
    } else {
      addFavorite({ ...movie, media_type: mediaType });
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:scale-[1.02] duration-300">
      <Link to={detailPath}>
        <img
          src={imageUrl}
          alt={title || name}
          className="w-full h-[400px] object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {title || name}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({(release_date || first_air_date || "").split("-")[0]})
            </span>
          </h3>
          <button onClick={toggleFavorite} className="text-xl">
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
          {overview || "Sinopsis no disponible."}
        </p>
      </div>
    </div>
  );
}
