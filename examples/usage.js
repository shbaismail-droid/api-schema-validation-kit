const assert = require("assert");
const { validateSchema } = require("../src/validator");

const validResult = validateSchema("schemas/user.schema.json", "examples/valid-user.json");
assert.strictEqual(validResult.valid, true, "Expected valid payload to pass validation");

const invalidResult = validateSchema("schemas/user.schema.json", "examples/invalid-user.json");
assert.strictEqual(invalidResult.valid, false, "Expected invalid payload to fail validation");
assert.ok(Array.isArray(invalidResult.errors), "Expected validation errors array");

console.log("All validation tests passed.");
