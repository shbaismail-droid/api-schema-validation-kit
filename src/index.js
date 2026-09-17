const { validateSchema, runCli } = require("./validator");
const { loadSchema } = require("./schemaLoader");

module.exports = {
  validateSchema,
  loadSchema,
  runCli
};
