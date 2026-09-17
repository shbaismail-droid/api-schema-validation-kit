const fs = require("fs");
const path = require("path");

function loadSchema(schemaName) {
  const schemaPath = path.resolve(__dirname, "..", "schemas", schemaName);

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  return JSON.parse(fs.readFileSync(schemaPath, "utf8"));
}

module.exports = { loadSchema };
