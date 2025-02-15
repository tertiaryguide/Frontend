/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "faq-bg": "url('')",
        "admission-bg": "url('')",
      },
      borderRadius: {
        xxl: "24px",
        xl: "16px",
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      colors: {
        primary: "#FEBC10",
        light: "#FFF9FF",
        secondary: "#0E0E0E",
        neutral: "#0E0E0E",
        dark: "#f5f5f5",
        outline: "#2D3748",
      },
    },
  },
  plugins: [],
};
