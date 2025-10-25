/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug"], // Quét đúng thư mục views
  theme: {
    extend: {
      keyframes: {
        loadingFade: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        loadingFade: 'loadingFade 1s infinite',
      },
    },
  },
  plugins: [],
}
