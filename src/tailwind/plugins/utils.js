const plugin = require("tailwindcss/plugin");

const utils = plugin(({ addComponents }) => {
  addComponents({});

  addComponents({});
});

module.exports = utils;
