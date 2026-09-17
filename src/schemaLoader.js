const fs = require("fs");
const path = require("path");

function loadSchema(schemaName) {
  const schemaPath = path.join(__dirname, "..", "schemas", schemaName);
  return JSON.parse(fs.readFileSync(schemaPath, "utf8"));
}

module.exports = { loadSchema };
