const { execSync } = require("child_process");

try {
  execSync("node src/validator.js schemas/user.schema.json examples/valid-user.json", { stdio: "inherit" });
  console.log("Valid test passed.");
} catch (error) {
  console.error("Valid test failed.");
  process.exit(1);
}

try {
  execSync("node src/validator.js schemas/user.schema.json examples/invalid-user.json", { stdio: "inherit" });
  console.log("Invalid test should have failed.");
  process.exit(1);
} catch (error) {
  console.log("Invalid test passed as expected.");
}
