const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

function validateSchema(schemaPath, dataPath) {
  const ajv = new Ajv({
    allErrors: true,
    strict: false
  });

  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.log("Validation failed.");
    console.log(JSON.stringify(validate.errors, null, 2));
    return false;
  }

  console.log("Validation succeeded.");
  console.log(JSON.stringify(data, null, 2));
  return true;
}

const schemaPath = process.argv[2];
const dataPath = process.argv[3];

if (!schemaPath || !dataPath) {
  console.log("Usage: node src/validator.js <schema.json> <data.json>");
  process.exit(1);
}

const schemaFullPath = path.resolve(schemaPath);
const dataFullPath = path.resolve(dataPath);

if (!fs.existsSync(schemaFullPath)) {
  console.error(`Schema file not found: ${schemaFullPath}`);
  process.exit(1);
}

if (!fs.existsSync(dataFullPath)) {
  console.error(`Data file not found: ${dataFullPath}`);
  process.exit(1);
}

validateSchema(schemaFullPath, dataFullPath);
