import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '80': '0.8',
        '90': '0.9',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
        "flap": {
          "0%, 100%": { transform: "rotate(-12deg)" },
          "50%": { transform: "rotate(-45deg)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(45deg)" },
          "50%": { transform: "rotate(30deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(45deg)" },
          "50%": { transform: "translateY(-10px) rotate(45deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "wink": {
          "0%, 10%, 100%": { transform: "scaleY(1)" },
          "5%": { transform: "scaleY(0.1)" },
        },
        "grow": {
          "0%, 100%": { height: "0.5rem", width: "3rem" },
          "50%": { height: "0.75rem", width: "2.5rem" },
        },
        "blink": {
          "0%, 10%, 100%": { transform: "scaleY(1)" },
          "5%": { transform: "scaleY(0.1)" },
        },
        "talk": {
          "0%, 100%": { borderTopWidth: "12px" },
          "50%": { borderTopWidth: "6px" },
        },
        "trunk-sway": {
          "0%, 100%": { transform: "skew(0deg)" },
          "25%": { transform: "skew(5deg)" },
          "75%": { transform: "skew(-5deg)" },
        },
        "groove": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-5px) rotate(-1deg)" },
          "75%": { transform: "translateY(-5px) rotate(1deg)" },
        },
        "robot-dance": {
          "0%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-10px) rotate(3deg)" },
          "40%": { transform: "translateY(0) rotate(-3deg)" },
          "60%": { transform: "translateY(-5px) rotate(3deg)" },
          "80%": { transform: "translateY(0) rotate(-3deg)" },
        },
        "owl-dance": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(-5deg)" },
          "50%": { transform: "translateY(0) rotate(0deg)" },
          "75%": { transform: "translateY(-10px) rotate(5deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-horizontal": "bounce-horizontal 0.8s infinite",
        "flap": "flap 0.5s infinite",
        "sway": "sway 2s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "float": "float 2s ease-in-out infinite",
        "spin-slow": "spin-slow 4s linear infinite",
        "wink": "wink 2.5s infinite",
        "grow": "grow 0.5s infinite",
        "blink": "blink 3s infinite",
        "talk": "talk 0.3s infinite",
        "trunk-sway": "trunk-sway 2s ease-in-out infinite",
        "groove": "groove 0.8s ease-in-out infinite",
        "robot-dance": "robot-dance 1.5s ease-in-out infinite",
        "owl-dance": "owl-dance 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
  ],
}

export default config