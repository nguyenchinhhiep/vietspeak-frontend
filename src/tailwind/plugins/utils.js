const plugin = require("tailwindcss/plugin");

const utils = plugin(({ addComponents }) => {
  addComponents(
    {},
    {
      variants: ["dark", "responsive", "group-hover", "hover"],
    }
  );

  addComponents(
    {},
    {
      variants: ["dark", "group-hover", "hover"],
    }
  );
});

module.exports = utils;
