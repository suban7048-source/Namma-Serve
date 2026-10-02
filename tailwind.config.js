/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ns-navy': '#102A43',
        'ns-primary': '#059669',
        'ns-primary-bright': '#10B981',
        'ns-bg': '#F8FAFC',
        'ns-text': '#102A43',
        'ns-text-secondary': '#52667A',
        'ns-border': '#DCE4EC',
        'ns-success': '#16A34A',
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        slate: {
          850: '#141e33',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(16, 42, 67, 0.04), 0 1px 2px -1px rgba(16, 42, 67, 0.03)',
        'card': '0 4px 16px -2px rgba(16, 42, 67, 0.06), 0 2px 4px -2px rgba(16, 42, 67, 0.04)',
        'elevated': '0 12px 32px -4px rgba(16, 42, 67, 0.1), 0 4px 8px -2px rgba(16, 42, 67, 0.04)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}
