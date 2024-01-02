// @ts-nocheck
const chroma = require("chroma-js");

/**
 * Generates palettes from the provided configuration.
 * Accepts a single color string or a Tailwind-like
 * color object. If provided Tailwind-like color object,
 * it must have a 500 hue level.
 *
 * @param config
 */
const generatePalette = (config) => {
  // create pallete object
  const palette = {
    50: null,
    100: null,
    200: null,
    300: null,
    400: null,
    500: null,
    600: null,
    700: null,
    800: null,
    900: null,
  };

  // check if config is a string and a valid color
  if (typeof config === "string") {
    palette[500] = chroma.valid(config) ? config : null;
  }

  // Check if config is an object
  if (config != null && config.constructor.name === "Object") {
    if (!chroma.valid(config[500])) {
      throw new Error(
        "You must have a 500 hue in your palette configuration! Make sure the main color of your palette is marked as 500."
      );
    }

    // Merge the values
    Object.keys(config).forEach((key) => {
      if (palette.hasOwnProperty(key)) {
        palette[key] = chroma.valid(config[key]) ? config[key] : null;
      }
    });
  }

  // create colors array
  const colors = Object.values(palette).filter((color) => color);

  // Generate a very light and a very dark version of the default color
  colors.unshift(
    chroma
      .scale(["white", palette[500]])
      .domain([0, 1])
      .mode("lrgb")
      .colors(50)[1]
  );

  colors.push(
    chroma
      .scale(["black", palette[500]])
      .domain([0, 1])
      .mode("lrgb")
      .colors(10)[1]
  );

  // Prepare the domain array
  const domain = [
    0,
    ...Object.entries(palette)
      .filter(([key, value]) => value)
      .map(([key]) => +key / 1000),
    1,
  ];

  // Generate the color scale
  const scale = chroma.scale(colors).domain(domain).mode("lrgb");

  // Build and return the final palette
  return {
    50: scale(0.05).hex(),
    100: scale(0.1).hex(),
    200: scale(0.2).hex(),
    300: scale(0.3).hex(),
    400: scale(0.4).hex(),
    500: scale(0.5).hex(),
    600: scale(0.6).hex(),
    700: scale(0.7).hex(),
    800: scale(0.8).hex(),
    900: scale(0.9).hex(),
  };
};

module.exports = generatePalette;
