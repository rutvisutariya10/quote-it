import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',    
    './src/components/*.{ts,tsx}', 
    './src/lib/**/*.{ts,tsx}',    
  ],
  theme: {
    extend: {
      colors: {
        // Custom color based on your request
        customBrown: '#846C5B', 
        customBlue: '#173054',
        customEggshell: '#ECECD9' 
      },
    },
  },
  plugins: [],
};

export default config;
