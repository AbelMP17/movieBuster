// src/context/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    if (!favorites.find((fav) => fav.id === item.id && fav.media_type === item.media_type)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (id, media_type) => {
    setFavorites(favorites.filter((fav) => !(fav.id === id && fav.media_type === media_type)));
  };

  const isFavorite = (id, media_type) => {
    return favorites.some((fav) => fav.id === id && fav.media_type === media_type);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);