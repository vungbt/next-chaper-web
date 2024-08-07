import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/libraries/**/*.{js,ts,jsx,tsx,mdx}',
    './src/@views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '560px',
      md: '740px',
      lg: '1024px',
      xl: '1300px',
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '1rem',
        '2xl': '1rem'
      },
      screens: {
        sm: '560px',
        md: '740px',
        lg: '1024px',
        xl: '1300px',
        '2xl': '1536px'
      }
    },
    fontFamily: {
      primary: 'var(--font-primary)'
    },
    colors: {
      // default
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',

      // theme
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      tertiary: 'var(--tertiary-color)',
      white: 'var(--white)',
      dark: 'var(--dark)',

      success: 'var(--success)',
      info: 'var(--info)',
      danger: 'var(--danger)',
      warning: 'var(--warning)',

      green: {
        DEFAULT: 'var(--green)',
        900: 'var(--green-900)',
        800: 'var(--green-800)',
        700: 'var(--green-700)',
        600: 'var(--green-600)',
        500: 'var(--green-500)'
      },
      indigo: {
        DEFAULT: 'var(--indigo)',
        900: 'var(--indigo-900)',
        800: 'var(--indigo-800)',
        700: 'var(--indigo-700)',
        600: 'var(--indigo-600)',
        500: 'var(--indigo-500)'
      },
      yellow: {
        DEFAULT: 'var(--yellow)',
        900: 'var(--yellow-900)',
        800: 'var(--yellow-800)',
        700: 'var(--yellow-700)',
        600: 'var(--yellow-600)',
        500: 'var(--yellow-500)'
      },
      orange: {
        DEFAULT: 'var(--orange)',
        900: 'var(--orange-900)',
        800: 'var(--orange-800)',
        700: 'var(--orange-700)',
        600: 'var(--orange-600)',
        500: 'var(--orange-500)'
      },
      red: {
        DEFAULT: 'var(--red)',
        900: 'var(--red-900)',
        800: 'var(--red-800)',
        700: 'var(--red-700)',
        600: 'var(--red-600)',
        500: 'var(--red-500)'
      },
      slate: {
        DEFAULT: 'var(--slate)',
        900: 'var(--slate-900)',
        800: 'var(--slate-800)',
        700: 'var(--slate-700)',
        600: 'var(--slate-600)',
        500: 'var(--slate-500)'
      },
      black: {
        DEFAULT: 'var(--black)',
        900: 'var(--black-900)',
        800: 'var(--black-800)',
        700: 'var(--black-700)',
        600: 'var(--black-600)',
        500: 'var(--black-500)'
      },
      bg: {
        DEFAULT: 'var(--bg)',
        900: 'var(--bg-900)',
        800: 'var(--bg-800)',
        700: 'var(--bg-700)',
        600: 'var(--bg-600)',
        500: 'var(--bg-500)'
      },
      gray: {
        DEFAULT: 'var(--gray-100)',
        100: 'var(--gray-100)'
      }
    },
    extend: {
      width: {
        '0.5': '0.125rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem'
      },
      height: {
        '0.5': '0.125rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem'
      },
      spacing: {
        '0.5': '0.125rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem'
      },
      borderWidth: {
        1.5: '1.5px'
      },
      borderRadius: {
        '4xl': '2.25rem'
      },
      fontSize: {
        h1: '48px',
        h2: '40px',
        h3: '33px',
        h4: '28px',
        h5: '23px',
        title1: '19px',
        title2: '16px',
        body: '13px',
        caption: '11px'
      },
      boxShadow: {
        'green-hover': '0px 3px 8px 0px var(--green-500)',
        'indigo-hover': '0px 3px 8px 0px var(--indigo-500)',
        'yellow-hover': '0px 3px 8px 0px var(--yellow-500)',
        'orange-hover': '0px 3px 8px 0px var(--orange-500)',
        'red-hover': '0px 3px 8px 0px var(--red-500)',
        'black-hover': '0px 3px 8px 0px var(--black-500)',
        'dark-opacity': '0px 2px 10px 0px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
};
export default config;
