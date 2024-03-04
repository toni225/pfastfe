/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
      'my-shadow': '-1px 3px rgba(0, 0, 0, 0.2)',
    },
      colors: {
        'PO-Primary':  '#E7F5F5',    // 60% color - Background/Backdrops
        'PO-Secondary':  '#262341',  // 30% color - Headers/Popups/etc.
        'PO-Tertiary':  '#F9D94A',   // 10% color - Clickables/Actions
        'VO-Primary':  '#E7F5F5',    // 60% color - Background/Backdrops
        'VO-Secondary':  '#F9D94A',  // 30% color - Headers/Popups/etc.
        'VO-Tertiary':  '#262341',   // 10% color - Clickables/Actions
      }    
  },
  },
  plugins: [],
}