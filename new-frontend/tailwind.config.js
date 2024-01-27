/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(112deg, #21F5B5 -18.25%, #19276E 122.31%)",
      },
    },
    colors: {
      light: "#F2F2F2",
      dark: "#333333",
    },
  },
  plugins: [],
};
