/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FFFFFF",
        background: "#10141E",
        redColor: "#FC4747",
        darkBlue: "#161D2F",
      },
    },
  },
  plugins: [],
};

