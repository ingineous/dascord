import { defineConfig } from "@pandacss/dev";

const colors = {
  antiFlashWhite: { value: "#EDF1EF" },
  silver: { value: "#B1B9BB" },
  silverJet: { value: "#C4CACA" },
  antiFlashWhiteJet: { value: "#E0E5EA" },
  cadetGray: { value: "#989F9E" },
  jet: { value: "#282A2A" },
  eerieBlack: { value: "#242626" },
  roseTaupe: { value: "#785964" },
  onyx: { value: "#393B3B" },
  rosePompadour: { value: "#EE7897" },
};

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors,
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});

export { colors };
