import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logo_white from "../assets/logo_white.png";
import ThemeToggle from "./ThemeToggle";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const buttonRef = useRef(null);

  const dark = document.documentElement.classList.contains("dark");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    scrolled
      ? "sticky bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow"
      : "absolute bg-transparent"
  } transition-all duration-500 ease-in-out`;

  return (
    <nav className={navClasses}>
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={dark ? logo_white : logo}
            alt="MovieBuster Logo"
            className="w-[100px]"
          />
        </Link>

        <div className="flex items-center gap-4">
          <DesktopMenu />
          <ThemeToggle />

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
                className={`absolute left-0 top-0 w-6 h-[2px] dark:bg-gray-400 bg-gray-800 transform transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[10px]" : ""
                }`}
              ></span>
              <span
                className={`absolute left-0 top-1/2 w-6 h-[2px] dark:bg-gray-400 bg-gray-800 transform transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute left-0 bottom-0 w-6 h-[2px] dark:bg-gray-400 bg-gray-800 transform transition-all duration-300 ${
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
