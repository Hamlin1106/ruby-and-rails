import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#d80c18",
      black: "#000000",
      red: "#d80c18",
      error: "#d80c18",
      white: "#FFFFFF",
      blue: "#086fca",
      border: "#404040",
      borderLight: "#C6C7C7",
      disabled: "#BFBFBF",
      link: "#3758F9",
      errorBorder: "#DC2626",
      errorInput: "#FEE2E2",
      tableHeader: "#F1F0F0",
      secondary: "#002060",
    },
  },
  plugins: [],
};
export default config;
