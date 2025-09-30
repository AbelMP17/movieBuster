// src/pages/Home.jsx
import PageWrapper from "../components/PageWrapper";
import MovieCarousel from "../components/MovieCarousel";
import SeriesCarousel from "../components/SeriesCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";
import DynamicHero from "../components/DynamicHero";

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO dinámico con imágenes de fondo cambiantes */}
      <DynamicHero />

      {/* Carrusel de Películas */}
      <section className="relative py-16 px-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-300/30 dark:from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-300/30 dark:from-black to-transparent z-10" />
        <h2 className="text-3xl ml-5 font-bold mb-6 text-gray-900 dark:text-white">
          Películas populares
        </h2>
        <MovieCarousel />
      </section>

      {/* Carrusel de Series */}
      <section className="relative py-16 px-6 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-300/30 dark:from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-300/30 dark:from-black to-transparent z-10" />
        <h2 className="text-3xl ml-5 font-bold mb-6 text-gray-900 dark:text-white">
          Series populares
        </h2>
        <SeriesCarousel />
      </section>

      {/* Carrusel de Destacados */}
      <section className="relative py-16 px-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-300/30 dark:from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-300/30 dark:from-black to-transparent z-10" />
        <h2 className="text-3xl ml-5 font-bold mb-6 text-gray-900 dark:text-white">
          Destacados
        </h2>
        <FeaturedCarousel />
      </section>
    </PageWrapper>
  );
}
