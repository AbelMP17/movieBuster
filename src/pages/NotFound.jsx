// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="flex flex-col items-center justify-center text-center py-32 px-6 min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100  transition-all duration-500">
        <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-xl font-medium"
        >
          Volver al inicio
        </Link>
      </section>
    </PageWrapper>
  );
}
