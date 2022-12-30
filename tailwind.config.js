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
        base: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
      },
      fontSize: {
        xs: "0.8125rem",
      },
      screens: {
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1440px",
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
