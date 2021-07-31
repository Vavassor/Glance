module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        focus: "#4a258a",
        primary: "#fcba03",
        grey: {
          50: "#F9FAFB",
          900: "#111827",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-rtl")],
};
