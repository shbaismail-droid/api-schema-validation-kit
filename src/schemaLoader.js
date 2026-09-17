const fs = require("fs");
const path = require("path");

function resolveSchemaPath(schemaName) {
  const baseDir = path.resolve(__dirname, "..");
  const directPath = path.isAbsolute(schemaName) ? schemaName : path.join(baseDir, "schemas", schemaName);

  if (!fs.existsSync(directPath)) {
    throw new Error(`Schema file not found: ${directPath}`);
  }

  return directPath;
}

function loadSchema(schemaName) {
  const schemaPath = resolveSchemaPath(schemaName);
  return JSON.parse(fs.readFileSync(schemaPath, "utf8"));
}

module.exports = { loadSchema };
