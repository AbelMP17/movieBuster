// src/components/DesktopMenu.jsx
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function DesktopMenu( { scrolled } ) {
  const location = useLocation();
  const { favorites } = useFavorites();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center gap-6">
      {[
        { to: "/movies", label: "Películas" },
        { to: "/series", label: "Series" },
        { to: "/favoritos", label: "Favoritos" },
      ].map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`hover:text-red-500 transition-colors duration-200 ${
            isActive(to)
              ? "text-red-600 dark:text-red-400 font-semibold"
              : scrolled ? "dark:text-gray-200 text-gray-900": "dark:text-gray-200 text-gray-200"
          } relative`}
        >
          {label}
          {to === "/favoritos" && (
            <span className="ml-1 inline-block text-xs bg-red-500 text-white rounded-full px-2 py-[3px]">
              {favorites.length}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
