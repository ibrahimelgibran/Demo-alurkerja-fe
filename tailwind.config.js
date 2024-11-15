import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/alurkerja-ui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms({
      strategy: "class",
    }),
    scrollbar({ nocompatible: true }),
  ],
};
