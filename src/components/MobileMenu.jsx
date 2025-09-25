// src/components/MobileMenu.jsx
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useRef, useEffect, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

export default function MobileMenu({ isOpen, close, buttonRef }) {
  const location = useLocation();
  const { favorites } = useFavorites();
  const menuRef = useRef(null);
  const [animationClass, setAnimationClass] = useState("animate-fade-in-scale");

  // Cuando isOpen cambia a false → iniciar salida
  useEffect(() => {
    if (!isOpen) {
      setAnimationClass("animate-fade-out-scale");
    }
  }, [isOpen]);

  // Cierre con transición
  const handleLinkClick = () => {
    setAnimationClass("animate-fade-out-scale");
    setTimeout(close, 300);
  };

  useClickOutside(menuRef, () => {
    setAnimationClass("animate-fade-out-scale");
    setTimeout(close, 300);
  }, buttonRef);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      ref={menuRef}
      className={`md:hidden mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-lg absolute top-full left-6 right-6 z-40 ${animationClass}`}
    >
      {[
        { to: "/movies", label: "Películas" },
        { to: "/series", label: "Series" },
        { to: "/favoritos", label: "Favoritos" },
      ].map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          onClick={handleLinkClick}
          className={`text-center block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isActive(to)
              ? "text-red-600 dark:text-red-400 font-semibold"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {label}
          {to === "/favoritos" && (
            <span className="ml-1 inline-block text-xs bg-red-500 text-white rounded-full px-2 pt-[2px] pb-[4px]">
              {favorites.length}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
