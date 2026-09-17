const assert = require("assert");
const { validateData, validateSchemaFile } = require("../src/index");
const { loadSchema } = require("../src/schemaLoader");

const userSchema = loadSchema("./schemas/user.schema.json");

const validUser = {
  id: 1,
  name: "Ahmed",
  email: "ahmed@example.com",
  age: 28
};

const invalidUser = {
  id: 0,
  name: "A",
  email: "not-an-email",
  age: 200
};

const validResult = validateData(userSchema, validUser);
assert.strictEqual(validResult.valid, true, "Valid payload should pass validation");

const invalidResult = validateData(userSchema, invalidUser);
assert.strictEqual(invalidResult.valid, false, "Invalid payload should fail validation");
assert.ok(invalidResult.errors.length > 0, "Errors should be returned for invalid payload");

assert.strictEqual(
  validateSchemaFile("schemas/user.schema.json", "examples/valid-user.json"),
  true,
  "Valid file-based validation should succeed"
);

assert.strictEqual(
  validateSchemaFile("schemas/user.schema.json", "examples/invalid-user.json"),
  false,
  "Invalid file-based validation should fail"
);

console.log("All validation tests passed.");
