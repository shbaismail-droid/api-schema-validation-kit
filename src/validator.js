const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

function readJsonInput(input, inputName) {
  if (typeof input === "string") {
    const targetPath = path.resolve(input);

    if (!fs.existsSync(targetPath)) {
      throw new Error(`${inputName} file not found: ${targetPath}`);
    }

    return JSON.parse(fs.readFileSync(targetPath, "utf8"));
  }

  if (input && typeof input === "object") {
    return input;
  }

  throw new Error(`${inputName} must be a JSON object or a path to a JSON file.`);
}

function validateData(schema, data, options = {}) {
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    validateSchema: false,
    ...options
  });

  const validate = ajv.compile(schema);
  const valid = validate(data);

  return {
    valid,
    errors: validate.errors || []
  };
}

function validateSchema(schemaInput, dataInput, options = {}) {
  try {
    const schema = readJsonInput(schemaInput, "Schema");
    const data = readJsonInput(dataInput, "Data");
    const result = validateData(schema, data, options);

    if (!result.valid) {
      console.log("Validation failed.");
      console.log(JSON.stringify(result.errors, null, 2));
      return false;
    }

    console.log("Validation succeeded.");
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Validation error.");
    console.error(error.message);
    return false;
  }
}

function validateSchemaFile(schemaPath, dataPath, options = {}) {
  return validateSchema(schemaPath, dataPath, options);
}

if (require.main === module) {
  const schemaInput = process.argv[2];
  const dataInput = process.argv[3];

  if (!schemaInput || !dataInput) {
    console.log("Usage: node src/validator.js <schema.json|schema-object> <data.json|data-object>");
    process.exit(1);
  }

  const isValid = validateSchema(schemaInput, dataInput);
  process.exitCode = isValid ? 0 : 1;
}

module.exports = {
  validateSchema,
  validateSchemaFile,
  validateData
};
