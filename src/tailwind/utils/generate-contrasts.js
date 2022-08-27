const chroma = require("chroma-js");

/**
 * Generates contrasting counterparts of the given palette.
 * The provided palette must be in the same format with
 * default Tailwind color palettes.
 *
 * @param palette
 * @private
 */
const generateContrasts = (palette) => {
  const lightColor = "#FFFFFF";
  let darkColor = "#FFFFFF";

  // Iterate through the palette to find the darkest color
  Object.entries(palette).forEach(([_, value]) => {
    darkColor =
      chroma.contrast(value, "#FFFFFF") > chroma.contrast(darkColor, "#FFFFFF")
        ? value
        : darkColor;
  });

  // Generate the contrasting colors
  const contrastingColorsMap = {};

  Object.entries(palette).forEach(([key, value]) => {
    contrastingColorsMap[key] =
      chroma.contrast(value, darkColor) > chroma.contrast(value, lightColor)
        ? darkColor
        : lightColor;
  });

  return contrastingColorsMap;
};

module.exports = generateContrasts;
