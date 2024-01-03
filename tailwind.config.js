const colors = require("tailwindcss/colors");
const path = require("path");
const defaultTheme = require("tailwindcss/defaultTheme");
const generatePalette = require(path.resolve(
  __dirname,
  "src/tailwindcss/utils/generate-palette"
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
      opacity: {
        12: "0.12",
        38: "0.38",
        87: "0.87",
      },
      rotate: {
        "-270": "270deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        270: "270deg",
      },
      scale: {
        "-1": "-1",
      },
      zIndex: {
        "-1": -1,
        49: 49,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        50: "12.5rem",
        90: "22.5rem",

        // Bigger values
        100: "25rem",
        120: "30rem",
        128: "32rem",
        140: "35rem",
        160: "40rem",
        180: "45rem",
        192: "48rem",
        200: "50rem",
        240: "60rem",
        256: "64rem",
        280: "70rem",
        320: "80rem",
        360: "90rem",
        400: "100rem",
        480: "120rem",

        // Fractional values
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
      },
    },
  },
  plugins: [
    require(path.resolve(__dirname, "src/tailwindcss/plugins/icon-size")),
    require(path.resolve(__dirname, "src/tailwindcss/plugins/utilities")),
    require(path.resolve(__dirname, "src/tailwindcss/plugins/theming"))({
      themes,
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
