/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkRed: '#BA020A',
        lightRed: '#ff3131',
        customGray: '#383838',
        darkStart: '#0f0f0f',
        darkEnd: '#383838',
      },
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }),
    },
    gradientColorStops: theme => ({
      ...theme('colors'),
      'start': '#0f0f0f',
      'end': '#383838',
    }),
  },
  plugins: [],
}

