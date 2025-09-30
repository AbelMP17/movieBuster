// src/components/Footer.jsx
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-10 mt-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Marca */}
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">MovieBuster</h2>
          <p className="text-sm leading-relaxed">
            El lugar ideal para descubrir películas y series. Información
            actualizada, navegación rápida y diseño pensado para cinéfilos.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:abelwebdev0@gmail.com"
                className="hover:text-red-500 transition-colors"
              >
                abelwebdev0@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a
                href="https://www.linkedin.com/in/abel-mart%C3%ADnez-peinado-868436259/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Lema o derechos */}
        <div className="text-sm md:text-right">
          <p className="mb-2 italic">
            “Cine y series a un clic de distancia.”
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} MovieBuster. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
