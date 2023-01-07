// @ts-nocheck
const plugin = require("tailwindcss/plugin");
const path = require("path");
const colors = require("tailwindcss/colors");
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
            /**
             * If a custom property is not available, browsers will use
             * the fallback value. In this case, we want to use '--is-dark'
             * as the indicator of a dark theme so we can use it like this:
             * background-color: var(--is-dark, red);
             *
             * If we set '--is-dark' as "true" on dark themes, the above rule
             * won't work because of the said "fallback value" logic. Therefore,
             * we set the '--is-dark' to "false" on light themes and not set it
             * all on dark themes so that the fallback value can be used on
             * dark themes.
             *
             * On light themes, since '--is-dark' exists, the above rule will be
             * interpolated as:
             * "background-color: false"
             *
             * On dark themes, since '--is-dark' doesn't exist, the fallback value
             * will be used ('red' in this case) and the rule will be interpolated as:
             * "background-color: red"
             *
             * It's easier to understand and remember like this.
             */
            ...(!isDark ? { "--is-dark": "false" } : {}),

            // Generate custom properties from customProps
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

      // Generate general styles & utilities
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
            light: {
              "bg-default": colors.gray[100],
              "bg-surface": colors.white,
              "bg-hover": chroma(colors.gray[400]).alpha(0.12).css(),
            },
            dark: {
              "bg-default": colors.gray[900],
              "bg-surface": chroma(colors.gray[800]).alpha(0.5).css(),
              "bg-hover": "rgba(255,255,255,0.1)",
            },
          },
          foreground: {
            light: {
              "text-default": colors.gray[900],
              "text-secondary": colors.gray[700],
              "text-tertiary": colors.gray[500],
              "text-hint": colors.gray[400],
              "text-disabled": colors.gray[400],
              "border-light": colors.gray[200],
              "border-base": colors.gray[300],
              "border-dark": colors.gray[400],
              divider: colors.gray[200],
              icon: colors.gray[500],
            },
            dark: {
              "text-default": colors.gray[50],
              "text-secondary": colors.gray[200],
              "text-tertiary": colors.gray[400],
              "text-hint": colors.gray[500],
              "text-disabled": colors.gray[500],
              "border-light": chroma(colors.gray[700]).alpha(0.5).css(),
              "border-base": chroma(colors.gray[600]).css(),
              "border-dark": chroma(colors.gray[300]).alpha(0.12).css(),
              divider: chroma(colors.gray[100]).alpha(0.12).css(),
              icon: colors.gray[400],
            },
          },
        },
        themes: generateThemesObject(options.themes),
      },
    };
  }
);

module.exports = theming;
