const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

function readJsonInput(input, label) {
  if (typeof input === "string") {
    const resolvedPath = path.resolve(input);

    if (fs.existsSync(resolvedPath)) {
      return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
    }

    try {
      return JSON.parse(input);
    } catch (error) {
      throw new Error(`Invalid ${label} input. Expected a JSON string or a valid file path. Received: ${input}`);
    }
  }

  if (input && typeof input === "object") {
    return input;
  }

  throw new Error(`Invalid ${label} input. Expected an object, JSON string, or file path.`);
}

function validateSchema(schemaInput, dataInput, options = {}) {
  const { pretty = false } = options;

  try {
    const ajv = new Ajv({
      allErrors: true,
      strict: false,
      validateSchema: false,
      unicodeRegExp: false
    });

    const schema = readJsonInput(schemaInput, "schema");
    const data = readJsonInput(dataInput, "data");
    const validate = ajv.compile(schema);
    const valid = validate(data);

    const result = {
      valid,
      errors: validate.errors || []
    };

    if (!valid) {
      console.error("Validation failed.");
      console.error(JSON.stringify(result.errors, null, pretty ? 2 : 0));
      return result;
    }

    console.log("Validation succeeded.");

    if (pretty) {
      console.log(JSON.stringify(data, null, 2));
    }

    return result;
  } catch (error) {
    const result = {
      valid: false,
      errors: [{ message: error.message }]
    };

    console.error("Validation error.");
    console.error(error.message);
    return result;
  }
}

module.exports = { validateSchema };

if (require.main === module) {
  const rawArgs = process.argv.slice(2);
  const args = {};

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema") {
      args.schema = rawArgs[i + 1];
      i += 1;
    } else if (arg === "--data") {
      args.data = rawArgs[i + 1];
      i += 1;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (!args.schema && !args.data) {
      args.schema = arg;
    } else if (!args.data) {
      args.data = arg;
    }
  }

  if (args.help || (!args.schema && !args.data)) {
    console.log("Usage: node src/cli.js --schema <schema.json> --data <data.json> [--pretty]");
    console.log("       node src/cli.js schemas/user.schema.json examples/valid-user.json");
    process.exit(args.help ? 0 : 1);
  }

  const result = validateSchema(args.schema, args.data, { pretty: args.pretty ?? false });
  process.exitCode = result.valid ? 0 : 1;
}
