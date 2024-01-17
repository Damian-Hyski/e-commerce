/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(112deg, #21F5B5 -18.25%, #19276E 122.31%)",
      },
      boxShadow: {
        custom: "0px -10px 40px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    colors: {
      light: "#F2F2F2",
      dark: "#333333",
    },
  },
  plugins: [],
};
