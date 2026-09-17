#!/usr/bin/env node

const { validateSchema } = require("./validator");

function parseArgs(argv) {
  const options = {
    pretty: false,
    help: false,
    schema: null,
    data: null
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--pretty") {
      options.pretty = true;
      continue;
    }

    if (arg === "--schema") {
      options.schema = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === "--data") {
      options.data = argv[i + 1];
      i += 1;
      continue;
    }

    if (!options.schema) {
      options.schema = arg;
      continue;
    }

    if (!options.data) {
      options.data = arg;
    }
  }

  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help || (!options.schema && !options.data)) {
    console.log("Usage: api-schema-validation-kit --schema <schema.json> --data <data.json> [--pretty]");
    console.log("       api-schema-validation-kit schemas/user.schema.json examples/valid-user.json");
    process.exit(options.help ? 0 : 1);
  }

  const result = validateSchema(options.schema, options.data, { pretty: options.pretty });
  process.exitCode = result.valid ? 0 : 1;
}

main();
