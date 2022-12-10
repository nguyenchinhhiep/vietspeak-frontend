const colors = require("tailwindcss/colors");
const path = require("path");
const defaultTheme = require("tailwindcss/defaultTheme");
const generatePalette = require(path.resolve(
  __dirname,
  "src/tailwind/utils/generate-palette"
));

/**
 * Custom palettes
 *
 * Uses the generatePalette helper method to generate
 * Tailwind-like color palettes automatically
 */
const customPalettes = {
  blue: generatePalette("#005fb8"),
};

/**
 * Themes
 */
const themes = {
  // Default theme is required for theming system to work correctly
  default: {
    primary: {
      ...colors.blue,
    },
    accent: {
      ...colors.rose,
    },
    secondary: {
      ...colors.gray,
    },
    success: {
      ...colors.green,
    },
    info: {
      ...colors.sky,
    },
    warn: {
      ...colors.yellow,
    },
    danger: {
      ...colors.red,
    },
  },
};

module.exports = {
  content: ["./src/**/*.{html,scss,ts}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      boxShadow: {
        base: "rgba(0, 0, 0, 0.1) 0px 0px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      },
      fontSize: {
        xs: "0.8125rem",
        base: "0.9375rem",
      },
    },
  },
  plugins: [
    require(path.resolve(__dirname, "src/tailwind/plugins/icon-size")),
    require(path.resolve(__dirname, "src/tailwind/plugins/utils")),
    require(path.resolve(__dirname, "src/tailwind/plugins/theming"))({
      themes,
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
