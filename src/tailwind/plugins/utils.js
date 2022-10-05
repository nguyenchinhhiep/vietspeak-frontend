const plugin = require("tailwindcss/plugin");

const utils = plugin(({ addComponents }) => {
  addComponents({
    ".mat-icon": {
      "--tw-text-opacity": "1",
      color: "rgba(var(--mat-icon-rgb), var(--tw-text-opacity))",
    },
    ".text-default": {
      "--tw-text-opacity": "1 !important",
      color: "rgba(var(--text-default-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-secondary": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-secondary-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-hint": {
      "--tw-text-opacity": "1 !important",
      color: "rgba(var(--text-hint-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-disabled": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-disabled-rgb), var(--tw-text-opacity)) !important",
    },
    ".divider": {
      color: "var(--divider) !important",
    },

    ".bg-surface": {
      backgroundColor: "var(--bg-surface) !important",
    },

    ".bg-hover": {
      backgroundColor: "var(--bg-hover) !important",
    },
  });
});

module.exports = utils;
