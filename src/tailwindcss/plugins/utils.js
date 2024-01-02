const plugin = require("tailwindcss/plugin");

const utils = plugin(({ addComponents }) => {
  addComponents({
    ".icon": {
      "--tw-text-opacity": "1",
      color: "rgba(var(--icon-rgb), var(--tw-text-opacity))",
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

    ".text-tertiary": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-tertiary-rgb), var(--tw-text-opacity)) !important",
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

    ".border-light": {
      "border-color": "var(--border-light) !important",
    },

    ".border-base": {
      "border-color": "var(--border-base) !important",
    },

    ".border-dark": {
      "border-color": "var(--border-dark) !important",
    },

    ".divider": {
      color: "var(--divider) !important",
    },

    ".bg-default": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--bg-default-rgb), var(--tw-bg-opacity)) !important",
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
