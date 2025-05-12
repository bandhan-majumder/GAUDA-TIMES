/** @type {import('tailwindcss').Config} */

const config = require('@repo/tailwind-config/tailwindConfig');

module.exports = {
    ...config,
    content: [
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./src/**/*.stories.{ts,tsx}",
        "./stories/**/*.stories.{ts,tsx}",
      ], 
}; 