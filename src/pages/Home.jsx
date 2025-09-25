// src/pages/Home.jsx
import PageWrapper from "../components/PageWrapper";
import MovieCarousel from "../components/MovieCarousel";
import SeriesCarousel from "../components/SeriesCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";

export default function Home() {
  return (
    <PageWrapper>
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-all duration-500">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Bienvenido a MovieBuster
        </h1>
        <p className="text-lg md:text-xl max-w-xl text-gray-600 dark:text-gray-300 mb-10">
          Tu portal definitivo para descubrir información actualizada sobre tus
          películas y series favoritas. ¡Busca, explora y prepárate para tu
          próxima maratón!
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all">
          Buscar ahora
        </button>
      </section>

      <section className="relative py-16 px-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-300/30 dark:dark:from-black to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-300/30 dark:dark:from-black to-transparent z-10"></div>
        <h2 className="text-3xl ml-5 font-bold mb-6 text-gray-900 dark:text-white">
          Películas populares
        </h2>
        <MovieCarousel />
      </section>

      <section className="relative py-16 px-6 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-300/30 dark:from-black to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-300/30 dark:from-black to-transparent z-10"></div>
        <h2 className="text-3xl ml-5 font-bold mb-6 text-gray-900 dark:text-white">
          Series populares
        </h2>
        <SeriesCarousel />
      </section>

      <section className="relative py-16 px-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-300/30 dark:dark:from-black to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-300/30 dark:dark:from-black to-transparent z-10"></div>
        <h2 className="text-3xl ml-5 font-bold mb-6 text-gray-900 dark:text-white">
          Destacados
        </h2>
        <FeaturedCarousel />
      </section>
    </PageWrapper>
  );
}
