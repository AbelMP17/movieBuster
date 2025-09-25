// src/components/FeaturedCarousel.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper-custom.css";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function FeaturedCarousel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMovies = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
    ).then((res) => res.json());

    const fetchSeries = fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`
    ).then((res) => res.json());

    Promise.all([fetchMovies, fetchSeries])
      .then(([moviesData, seriesData]) => {
        const movies = moviesData.results.slice(0, 5).map((item) => ({
          ...item,
          media_type: "movie",
        }));

        const series = seriesData.results.slice(0, 5).map((item) => ({
          ...item,
          media_type: "tv",
        }));

        setItems([...movies, ...series]);
      })
      .catch((err) => console.error("Error fetching destacados:", err));
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={20}
      slidesPerView={2}
      navigation
      autoplay={{ delay: 3500 }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className="!pb-8"
    >
      {items.map((item) => (
        <SwiperSlide key={`${item.media_type}-${item.id}`}>
          <Link
            to={`/${item.media_type === "tv" ? "series" : "movie"}/${item.id}`}
            className="block shadow-md hover:dark:shadow-black hover:shadow-lg hover:-translate-y-2 transition-all duration-300 rounded-xl mt-2"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="rounded-t-xl"
            />
            <p className="text-sm text-center p-2 rounded-b-xl dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-100 h-[60px] flex justify-center items-center">
              {item.title || item.name}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
