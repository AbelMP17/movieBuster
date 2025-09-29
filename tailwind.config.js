/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        portal: {
          50: "#E6FFF9",
          100: "#C6FFE9",
          400: "#21E18C",
          500: "#13D26B",
          600: "#0FB75C",
          900: "#064F2B",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(33,225,140,.35)",
      },
    },
  },
  plugins: [],
};
