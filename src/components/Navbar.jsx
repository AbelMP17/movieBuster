import { useState, useEffect, useRef, } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logo_white from "../assets/logo_white.png";
import ThemeToggle from "./ThemeToggle";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useTheme } from "../context/ThemeContext"; // ya lo tienes importado


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const buttonRef = useRef(null);
  const location = useLocation().pathname

  const { darkMode } = useTheme();


useEffect(() => {
  const handleScroll = () => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
  };

  handleScroll(); // Ejecutar una vez al montar para establecer el estado inicial

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
    setIsHome(location == '/')
}, [location])


  // Monta el menú solo si debe
  useEffect(() => {
    if (menuOpen) {
      setShouldRenderMenu(true);
    }
  }, [menuOpen]);

  const handleCloseWithAnimation = () => {
    setMenuOpen(false); // solo cierra visualmente
    setTimeout(() => {
      setShouldRenderMenu(false); // desmonta después de animación
    }, 300); // debe coincidir con la duración de la animación
  };

  const baseClasses =
    "top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300";
  const navClasses = `${baseClasses} ${
    scrolled || !isHome
      ? "sticky bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow"
      : "fixed bg-transparent"
  } transition-all duration-500 ease-in-out`;

  return (
    <nav className={navClasses}>
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={darkMode ? logo_white : scrolled || !isHome ? logo : logo_white}
            alt="MovieBuster Logo"
            className="w-[100px]"
          />
        </Link>

        <div className="flex items-center gap-4">
          <DesktopMenu scrolled={scrolled} isHome={isHome} />
          <ThemeToggle scrolled={scrolled} isHome={isHome} />

          {/* Hamburguesa animada */}
          <button
            ref={buttonRef}
            onClick={() => {
              setMenuOpen((prev) => !prev);
              if (!menuOpen) setShouldRenderMenu(true);
            }}
            className="md:hidden ml-2 p-2 rounded focus:outline-none transition-transform duration-300"
            aria-label="Abrir menú"
          >
            {/* Animación de la hamburguesa */}
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 top-0 w-6 h-[2px] ${!scrolled && !isHome ? "bg-gray-400" : "dark:bg-gray-400 bg-gray-800" }  transform transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[10px]" : ""
                }`}
              ></span>
              <span
                className={`absolute left-0 top-1/2 w-6 h-[2px] ${!scrolled && !isHome ? "bg-gray-400" : "dark:bg-gray-400 bg-gray-800" } transform transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute left-0 bottom-0 w-6 h-[2px] ${!scrolled && !isHome ? "bg-gray-400" : "dark:bg-gray-400 bg-gray-800" } transform transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[10px]" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {shouldRenderMenu && (
        <MobileMenu
          isOpen={menuOpen}
          close={handleCloseWithAnimation}
          ignoreRef={buttonRef}
        />
      )}
    </nav>
  );
}
