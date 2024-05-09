import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      height: {
        18: '4.5rem',
      },
      colors: {
        blue: {
          50: '#F3F9FE',
          100: '#E3F2FF',
          200: '#AFDAFF',
          300: '#8FCBFF',
          400: '#52AFFF',
          500: '#029CFD',
          600: '#1778E9',
          700: '#0D64CA',
          800: '#1E4FAF',
          900: '#1E3A8A',
        },
        homeBackground: '#0d1026',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        // sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        homeAutomateHorizontal: {
          '0%': { opacity: '1', transform: 'translateX(-100%)' },
          '25%, 40%': {
            transform: 'translateX(0)',
            'box-shadow': '0 1px 7px 0 #fc521f',
          },
          '75%': { transform: 'translateX(0) translateY(213px)' },
          '85%': {
            opacity: '1',
            transform: 'translateX(0) translateY(213px)',
            'box-shadow': '0 1px 7px 0 #fc521f',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(30%) translateY(213px)',
          },
        },
        homeAutomateVertical: {
          '0%': { opacity: '1', transform: 'translateY(-100%)' },
          '25%, 40%': {
            transform: 'translateY(0)',
            'box-shadow': '0 1px 7px 0 #fc521f',
          },
          '75%': { transform: 'translateY(0) translateX(213px)' },
          '85%': {
            opacity: '1',
            transform: 'translateY(0) translateX(213px)',
            'box-shadow': '0 1px 7px 0 #fc521f',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(30%) translateX(213px)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
