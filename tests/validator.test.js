const assert = require("assert");
const path = require("path");
const { validateSchema } = require("../src/validator");

const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "schemas", "user.schema.json");
const validDataPath = path.join(rootDir, "examples", "valid-user.json");
const invalidDataPath = path.join(rootDir, "examples", "invalid-user.json");

const validResult = validateSchema(schemaPath, validDataPath);
assert.strictEqual(validResult.valid, true, "Valid payload should pass validation.");
assert.deepStrictEqual(validResult.errors, [], "Valid payload should not produce errors.");

const invalidResult = validateSchema(schemaPath, invalidDataPath);
assert.strictEqual(invalidResult.valid, false, "Invalid payload should fail validation.");
assert.ok(Array.isArray(invalidResult.errors), "Invalid payload should include error details.");
assert.ok(invalidResult.errors.length > 0, "At least one validation error should be returned.");

console.log("All validation tests passed.");
