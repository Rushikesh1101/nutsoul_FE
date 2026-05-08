/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FFF8F0',
          almond: '#8B6914',
          'almond-light': '#C4A35A',
          'almond-dark': '#5C4510',
          pistachio: '#6B8E23',
          'pistachio-light': '#9AB856',
          'pistachio-dark': '#4A6219',
          gold: '#D4A853',
          'gold-light': '#F0D78C',
          'gold-dark': '#A07D2E',
          brown: '#6B4226',
          'brown-light': '#8B6543',
          'brown-dark': '#3E2415',
          saffron: '#E07020',
          spice: '#C0392B',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4A853 0%, #F0D78C 50%, #D4A853 100%)',
      }
    },
  },
  plugins: [],
};
