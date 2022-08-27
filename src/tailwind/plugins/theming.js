const plugin = require("tailwindcss/plugin");
const path = require("path");
const chroma = require("chroma-js");
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;
const generateContrasts = require(path.resolve(
  __dirname,
  "../utils/generate-contrasts"
));

/**
 * Normalize the provided theme
 *
 * @param theme
 */
const normalizeTheme = (theme) => {
  // Check if object is empty
  const isEmptyObject = (obj) => {
    for (let i in obj) {
      return false;
    }
    return true;
  };

  return Object.entries(theme).reduce((acc, [key, value]) => {
    if (!key.startsWith("on") && !isEmptyObject(value)) {
      acc[key] = {
        ...value,
        DEFAULT: value["DEFAULT"] || value[500],
      };
    }
    return acc;
  }, {});
};

/**
 * Generates variable colors for the 'colors'
 * configuration from the provided theme
 *
 * @param theme
 */
const generateVariableColors = (theme) => {
  const withOpacity =
    (name) =>
    ({ opacityVariable, opacityValue }) => {
      if (opacityValue) {
        return `rgba(var(--${name}-rgb), ${opacityValue})`;
      }

      if (opacityVariable) {
        return `rgba(var(--${name}-rgb), var(${opacityVariable}, 1))`;
      }

      return `rgb(var(--${name}-rgb))`;
    };

  return Object.entries(flattenColorPalette(normalizeTheme(theme))).reduce(
    (acc, [key, _]) => {
      acc[key] = withOpacity(key);
      acc[`on-${key}`] = withOpacity(`on-${[key]}`);
      return acc;
    },
    {}
  );
};

/**
 * Generate and return themes object with theme name and colors/
 * This is useful for accessing themes from Angular (Typescript).
 *
 * @param themes
 * @returns {unknown[]}
 */
function generateThemesObject(themes) {
  const normalizedDefaultTheme = normalizeTheme(themes.default);

  return Object.entries(themes).reduce((acc, [key, value]) => {
    const normalizedTheme = normalizeTheme(value);
    const primary =
      normalizedTheme &&
      normalizedTheme.primary &&
      normalizedTheme.primary.DEFAULT
        ? normalizedTheme.primary.DEFAULT
        : normalizedDefaultTheme.primary.DEFAULT;
    const accent =
      normalizedTheme &&
      normalizedTheme.accent &&
      normalizedTheme.accent.DEFAULT
        ? normalizedTheme.accent.DEFAULT
        : normalizedDefaultTheme.accent.DEFAULT;
    const warn =
      normalizedTheme && normalizedTheme.warn && normalizedTheme.warn.DEFAULT
        ? normalizedTheme.warn.DEFAULT
        : normalizedDefaultTheme.warn.DEFAULT;

    acc.push({
      [key]: {
        primary,
        accent,
        warn,
      },
    });
    return acc;
  }, []);
}

/**
 * Tailwindcss Theming Plugin
 */
const theming = plugin.withOptions(
  (options) =>
    ({ addComponents, e, theme }) => {
      // Variable colors map
      const variableColorsMap = Object.entries(options.themes).reduce(
        (acc, [themeName, theme]) => {
          const obj = Object.entries(normalizeTheme(theme)).reduce(
            (acc, [paletteName, palette]) => {
              acc[`${e(paletteName)}`] = palette;

              const onPalette = Object.entries(
                generateContrasts(palette)
              ).reduce((acc, [contrastName, contrast]) => {
                acc[contrastName] =
                  theme?.[`on-${paletteName}`]?.[contrastName] || contrast;
                return acc;
              }, {});

              acc[`on-${e(paletteName)}`] = onPalette;

              return acc;
            },
            {}
          );

          const themeVariableColorsMap = Object.entries(
            flattenColorPalette(obj)
          ).reduce((acc, [key, value]) => {
            acc[`--${e(key)}`] = value;
            acc[`--${e(key)}-rgb`] = chroma(value).rgb().join(",");
            return acc;
          }, {});

          acc[themeName === "default" ? "body" : `.theme-${e(themeName)}`] = {
            ...themeVariableColorsMap,
          };
          return acc;
        },
        {}
      );

      addComponents(variableColorsMap);

      // Generate scheme based css custom properties and utility classes
      const schemeCustomProps = ["light", "dark"].map((colorScheme) => {
        const isDark = colorScheme === "dark";
        const background = theme(`customProps.background.${colorScheme}`);
        const foreground = theme(`customProps.foreground.${colorScheme}`);
        const lightSchemeSelectors = ".light, .dark .light";
        const darkSchemeSelectors = ".dark, .light .dark";

        return {
          [isDark ? darkSchemeSelectors : lightSchemeSelectors]: {
            ...Object.entries(background).reduce((acc, [key, value]) => {
              acc[`--${e(key)}`] = value;
              acc[`--${e(key)}-rgb`] = chroma(value).rgb().join(",");
              return acc;
            }, {}),
            ...Object.entries(foreground).reduce((acc, [key, value]) => {
              acc[`--${e(key)}`] = value;
              acc[`--${e(key)}-rgb`] = chroma(value).rgb().join(",");
              return acc;
            }, {}),
          },
        };
      });

      // Scheme ultility classes
      const schemeUtils = (() => {
        return {};
      })();

      addComponents(schemeCustomProps);
      addComponents(schemeUtils);
    },
  (options) => {
    return {
      theme: {
        extend: {
          colors: generateVariableColors(options.themes.default),
        },
        customProps: {
          background: {
            light: {},
            dark: {},
          },
          foreground: {
            light: {},
            dark: {},
          },
        },
        themes: generateThemesObject(options.themes),
      },
    };
  }
);

module.exports = theming;
