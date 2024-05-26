/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
          colors: {
            "logo-green": "#243e36",
            "my-color": "#00687F",
            "beige": "#f8f0e6"
          }
    },
  },
  plugins: [
    import('flowbite/plugin')
  ],
}

