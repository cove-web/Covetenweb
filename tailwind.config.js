/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0f62fe',
        secondary: '#175392',
        primaryText: '#2a2a2a',
        bgLight: '#f5f7fe',
        dimText: '#616876',
        darkDimText: '#9ca3af',
        darkBorder: '#303949',
        darkBg: '#111827',
        darkBgLight: '#1f2937',
        desktopPrimary: '#00406E',
        desktopText: '#3D3D3D',
        desktopBgLight: '#E2F3FF',
        desktopPrimaryLight: '#E2F3FF',
        desktopTextLight: '#3d3d3d80',
      },
      gridTemplateColumns: {
        sidebar: '250px auto', //for sidebar layout
        'sidebar-collapsed': '64px auto', //for collapsed sidebar layout
        'hide-sidebar': '1fr', //for hidden sidebar layout
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
