// src/pages/Favorites.jsx
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import PageWrapper from "../components/PageWrapper";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <PageWrapper>
      <section className="px-6 py-20 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-all duration-500">
        <h2 className="text-4xl font-bold mb-6">Mis Favoritos</h2>

        {favorites.length === 0 ? (
          <p className="text-gray-500">
            No has agregado ninguna película o serie a favoritos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
