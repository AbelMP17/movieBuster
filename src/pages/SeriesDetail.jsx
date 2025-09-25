// src/pages/SeriesDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SeriesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-ES`);
        const data = await res.json();
        setSeries(data);

        const videoRes = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=es-ES`);
        const videoData = await videoRes.json();

        const trailerVideo = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailerVideo) setTrailer(trailerVideo.key);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la serie.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="relative min-h-screen text-gray-100">
      {series.backdrop_path && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})` }}
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
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
            className="w-full md:w-[300px] rounded shadow"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{series.name}</h1>
            <p className="text-gray-200 mb-4">
              Primera emisión: {series.first_air_date} • ⭐ {series.vote_average.toFixed(1)} / 10
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {series.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed text-gray-100">
              {series.overview || "Sinopsis no disponible."}
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