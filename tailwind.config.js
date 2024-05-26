/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "640px", // Small devices (phones, 640px and up)
      md: "768px", // Medium devices (tablets, 768px and up)
      lg: "1024px", // Large devices (desktops, 1024px and up)
      xl: "1280px", // Extra large devices (large desktops, 1280px and up)
      "2xl": "1536px", // Double extra large devices (extra large desktops, 1536px and up)
    },
    extend: {
      backgroundImage: {
        menu: "url('https://static.vecteezy.com/system/resources/previews/009/344/914/original/food-seamless-pattern-cuisine-fast-food-cafe-wallpaper-with-gastronomy-icons-red-ruby-color-texture-decorative-textile-wrapping-paper-design-bright-background-for-menu-receipts-vector.jpg')",
      },
    },
    colors: {
      white: "#ffffff",
      main: "#ece3ca",
      transparent: "transparent",
      red: "red",
      "gray-200": "#e5e7eb",
      "gray-300": "#cbd5e1",
      "red-500": "#ef4444",
      "red-600": "#dc2626",
      "red-700": "#b91c1c",
      "green-700": "#15803d",
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
  daisyui: {
    themes: ["light"],
  },
};
