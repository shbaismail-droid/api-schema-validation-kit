# API Schema Validation Kit

A lightweight open-source toolkit for validating API payloads and JSON data using JSON Schema.

## Why this project exists

Modern APIs often break because of inconsistent payloads, missing fields, invalid values, or incomplete contracts between frontend and backend teams. This toolkit helps you validate payloads early and keep your data contracts clear and predictable.

## Features

- Validate JSON payloads using JSON Schema.
- Catch invalid API requests before they hit your service logic.
- Support beginner-friendly examples and quick demos.
- Keep validation logic modular and easy to test.
- Works well with Node.js and other JavaScript projects.

## Installation

```bash
git clone https://github.com/shbaismail-droid/api-schema-validation-kit.git
cd api-schema-validation-kit
npm install
```

## Usage

### Validate a schema against a JSON file

```bash
node src/validator.js schemas/user.schema.json examples/valid-user.json
```

### Using the package in code

```javascript
const { validateSchema } = require("./src");

const result = validateSchema("schemas/user.schema.json", "examples/valid-user.json");

if (!result.valid) {
  console.error(result.errors);
  process.exit(1);
}

console.log("Payload is valid.");
```

## Run tests

```bash
npm test
```

## Project structure

- `src/` — validation logic
- `schemas/` — JSON Schema examples
- `examples/` — sample valid and invalid payloads
- `tests/` — automated checks
- `todo-app/` — basic frontend demo app
- `joke-generator/` — another demo app

## Demo apps

This repository includes small UI demos to showcase frontend work and learning experiments:

- `todo-app/` — a task list app with local storage
- `joke-generator/` — a random joke generator using a public API

## Services and consulting

If you want help with:

- JSON Schema design
- API validation setup
- Data contracts
- Node.js integration
- API review and testing

You can contact:

- GitHub: https://github.com/shbaismail-droid
- Email: shbaismail@gmail.com

## License

MIT License
