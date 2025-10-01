// src/pages/Series.jsx
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import PageWrapper from "../components/PageWrapper";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const baseUrl = query
      ? `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
          query
        )}&page=${page}`
      : `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=es-ES&sort_by=${sort}&page=${page}`;

    setLoading(true);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Hubo un error al cargar las series.");
        setLoading(false);
      });
  }, [query, sort, page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <PageWrapper>
      <section className="px-6 py-5 min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-all duration-500">
        <h2 className="text-4xl font-bold mb-6">Buscar series</h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-1/4 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="popularity.desc">Más populares</option>
            <option value="popularity.asc">Menos populares</option>
            <option value="release_date.desc">Más recientes</option>
            <option value="release_date.asc">Más antiguas</option>
            <option value="vote_average.desc">Mejor valoradas</option>
            <option value="vote_average.asc">Peor valoradas</option>
          </select>
        </div>

        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.map((tv) => (
            <MovieCard key={tv.id} movie={tv} />
          ))}
        </div>

        <div className="sticky bottom-0 md:bottom-5 flex justify-center items-center gap-6 mt-10 bg-gray-950/30 w-fit m-auto p-2 rounded-lg backdrop-blur">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="font-medium text-white">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </section>
    </PageWrapper>
  );
}
