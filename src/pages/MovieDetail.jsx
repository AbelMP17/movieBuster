// src/pages/MovieDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`);
        const data = await res.json();
        setMovie(data);

        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`);
        const videoData = await videoRes.json();

        const trailerVideo = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailerVideo) setTrailer(trailerVideo.key);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la película.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="relative min-h-screen text-gray-100">
      {movie.backdrop_path && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        ></div>
      )}

      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 px-6 py-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded"
        >
          ← Volver
        </button>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white/10 dark:bg-black/30 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-[300px] rounded shadow"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-200 mb-4">
              {movie.release_date} • ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed text-gray-100">
              {movie.overview || "Sinopsis no disponible."}
            </p>
          </div>
        </div>

        {trailer && (
          <div className="max-w-5xl mx-auto mt-10 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Tráiler"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-xl"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
}
