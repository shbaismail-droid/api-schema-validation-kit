const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

function readJsonFile(filePath) {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`);
  }

  const fileContent = fs.readFileSync(resolvedPath, "utf8");
  return JSON.parse(fileContent);
}

function validateSchema(schemaOrPath, dataOrPath) {
  let schema;
  let data;

  try {
    schema = typeof schemaOrPath === "string" ? readJsonFile(schemaOrPath) : schemaOrPath;
    data = typeof dataOrPath === "string" ? readJsonFile(dataOrPath) : dataOrPath;
  } catch (error) {
    return {
      valid: false,
      errors: [{ message: error.message }],
      data: null,
      schema: null
    };
  }

  if (schema === null || typeof schema !== "object" || Array.isArray(schema)) {
    return {
      valid: false,
      errors: [{ message: "Schema must be a valid JSON object." }],
      data,
      schema
    };
  }

  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    validateFormats: true
  });

  const validator = ajv.compile(schema);
  const valid = validator(data);

  return {
    valid,
    errors: valid ? [] : (validator.errors || []),
    data,
    schema
  };
}

if (require.main === module) {
  const schemaPath = process.argv[2];
  const dataPath = process.argv[3];

  if (!schemaPath || !dataPath) {
    console.error("Usage: node src/validator.js <schema.json> <data.json>");
    process.exit(1);
  }

  const result = validateSchema(schemaPath, dataPath);

  if (!result.valid) {
    console.error("Validation failed.");
    console.error(JSON.stringify(result.errors, null, 2));
    process.exit(1);
  }

  console.log("Validation succeeded.");
  console.log(JSON.stringify(result.data, null, 2));
}

module.exports = { validateSchema, readJsonFile };
