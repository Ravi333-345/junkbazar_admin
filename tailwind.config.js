/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["gilroy-regular"],
    },
    extend: {
      // fontFamily: {
      //   gilroy: "Gilroy-Bold', sans-serif",
      //   roboto: "Roboto, sans-serif",
      //   mooli: "Mooli, sans-serif",
      // },
      colors: {
        lime: {
          primary: "#7ACC3E ",
          secondary: "#81D742",
        },
      },
      boxShadow: {
        bottom: "0 0 0 0 rgba(0, 0, 0, 0.3)",
      },
      screens: {
        xs: "480px",
        "max-sm": { max: "320px" },
        "max-lg": { max: "375px" },
        "max-md": { max: "425px" },
        "max-er": { max: "768px" },
        "min-er": { min: "768px" },
      },
    },
  },
  plugins: [],
};
