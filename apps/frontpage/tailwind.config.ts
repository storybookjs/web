import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
export default config;
