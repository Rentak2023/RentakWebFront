import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E5F2FF",
          100: "#CCE6FF",
          200: "#99CCFF",
          300: "#66B3FF",
          400: "#3399FF",
          500: "#0080FF",
          600: "#0066CC", // primary
          700: "#004D99",
          800: "#003366", // shade-3
          900: "#001A33", // shade-2
          950: "#000D19",
        },
        secondary: "#1DD2F3",
        // "primary-shade-1": "#000D1A",
        // "primary-shade-2": "#001A33",
        // "primary-shade-3": "#003366",
        // "primary-shade-4": "#80B3E6",
        // "primary-shade-5": "#C0D9F3",
        // "primary-shade-6": "#E0ECF9",
        // "hard-gray": "#6A6A6A",
        // "soft-gray": "#F5F5F5",
      },
      fontFamily: {
        sans: [
          "var(--font-general-sans)",
          "General Sans Fallback",
          "var(--font-noto-sans)",
          ...fontFamily.sans,
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config satisfies Config;
