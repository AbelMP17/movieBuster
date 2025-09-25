// src/components/SeriesCarousel.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper-custom.css";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SeriesCarousel() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => setSeries(data.results.slice(0, 10)))
      .catch((err) => console.error("Error fetching series:", err));
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={20}
      slidesPerView={2}
      navigation
      autoplay={{ delay: 3000 }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className="!pb-8"
    >
      {series.map((show) => (
        <SwiperSlide key={show.id}>
          <Link to={`/series/${show.id}`} className="block shadow-md hover:dark:shadow-gray-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 rounded-xl mt-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="rounded-t-xl"
            />
            <p className="text-sm text-center p-2 rounded-b-xl dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-100 h-[60px] flex justify-center items-center">
              {show.name}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
