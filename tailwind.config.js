/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7D5A50',     // Coffee brown
        secondary: '#B4846C',   // Light brown
        accent: '#E5B299',      // Cream
        background: '#FCDEC0',  // Light beige
        text: '#4A3731',        // Dark brown
      },
    },
  },
  plugins: [],
}; 