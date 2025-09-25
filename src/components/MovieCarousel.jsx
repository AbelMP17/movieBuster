import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper-custom.css";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 10)))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: swiperRef.current.el,
      start: "top center",
      end: "bottom center",
      onEnter: () => swiperRef.current.autoplay?.start(),
      onLeave: () => swiperRef.current.autoplay?.stop(),
      onEnterBack: () => swiperRef.current.autoplay?.start(),
      onLeaveBack: () => swiperRef.current.autoplay?.stop(),
    });

    return () => {
      trigger.kill();
    };
  }, [movies]);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={20}
      slidesPerView={2}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className="!pb-8"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link to={`/movie/${movie.id}`} className="block shadow-md hover:dark:shadow-black hover:shadow-lg hover:-translate-y-2 transition-all duration-300 rounded-xl mt-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-t-xl"
            />
            <p className=" text-sm text-center p-2 rounded-b-xl dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-100 h-[60px] flex justify-center items-center">
              {movie.title}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
