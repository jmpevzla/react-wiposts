module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    //themes: ['light', 'dark']
  }
}