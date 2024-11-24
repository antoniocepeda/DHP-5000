import { brandColors } from './constants';

export const theme = {
  colors: {
    brand: brandColors
  },
  components: {
    button: {
      primary: 'bg-gradient-to-r from-brand-purple via-brand-orange to-brand-pink text-white font-medium rounded-xl hover:opacity-90 transition duration-200',
      secondary: 'border-2 border-brand-purple text-brand-purple font-medium rounded-xl hover:bg-brand-purple/10 transition duration-200',
      white: 'bg-white text-brand-purple font-medium rounded-xl hover:bg-gray-100 transition duration-200',
    },
    card: {
      base: 'bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100',
      hover: 'hover:shadow-md transition duration-200',
    },
    input: {
      base: 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition bg-white/70 backdrop-blur-sm',
    }
  }
};