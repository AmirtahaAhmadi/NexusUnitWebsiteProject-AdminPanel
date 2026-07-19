postcss: {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-rtlcss")(),
  ];
}
