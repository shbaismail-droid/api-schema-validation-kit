const path = require("path");
const { validateSchema } = require("../src");

const schemaPath = path.join(__dirname, "..", "schemas", "user.schema.json");
const validDataPath = path.join(__dirname, "valid-user.json");

const result = validateSchema(schemaPath, validDataPath);

if (!result.valid) {
  console.error("Validation failed:", JSON.stringify(result.errors, null, 2));
  process.exit(1);
}

console.log("Valid user data accepted by the schema.");
