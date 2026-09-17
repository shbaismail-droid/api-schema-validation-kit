# API Schema Validation Kit

A lightweight, production-oriented toolkit for validating API payloads and data contracts with JSON Schema.

## What it does

This project helps teams and developers:

- Validate incoming API payloads before they reach business logic
- Detect invalid data early in the pipeline
- Reduce integration errors between services and clients
- Standardize data contracts using JSON Schema
- Keep validation logic reusable and testable

## Features

- JSON Schema validation using Ajv
- Simple Node.js API for schema and payload verification
- CLI support for quick local validation
- Example schemas and sample payloads
- Easy integration into Node.js applications

## Installation

```bash
npm install
```

## Usage

### CLI

```bash
node src/cli.js --schema schemas/user.schema.json --data examples/valid-user.json
```

Or the short form:

```bash
node src/cli.js schemas/user.schema.json examples/valid-user.json
```

### JavaScript API

```javascript
const { validateSchema, loadSchema } = require("./src");

const schema = loadSchema("user.schema.json");
const payload = {
  id: 1,
  name: "Sami",
  email: "sami@example.com"
};

const result = validateSchema(schema, payload, { pretty: true });
console.log(result.valid ? "Payload is valid" : "Payload is invalid");
```

### Example command

```bash
npm run validate -- --schema schemas/user.schema.json --data examples/valid-user.json
```

## Project structure

```text
api-schema-validation-kit/
├── src/
│   ├── cli.js
│   ├── index.js
│   ├── schemaLoader.js
│   └── validator.js
├── schemas/
│   └── user.schema.json
├── examples/
│   ├── valid-user.json
│   ├── invalid-user.json
│   └── usage.js
├── tests/
│   └── validator.test.js
├── README.md
├── package.json
├── LICENSE
└── .gitignore
```

## Validation example

```json
{
  "id": 1,
  "name": "Sami",
  "email": "sami@example.com"
}
```

This payload matches the included schema.

## Author

Sami Hassan Baismail

GitHub: https://github.com/shbaismail-droid
Email: shbaismail@gmail.com

## License

MIT License
