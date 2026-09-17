# API Schema Validation Kit

A lightweight Node.js toolkit for validating API payloads, backend contracts, and JSON data using JSON Schema.

It is designed for developers, startups, and teams who want to reduce integration bugs, improve data quality, and enforce clear API contracts before production.

## Why this project matters

- Reduces invalid payloads before they reach your server
- Improves API reliability and team collaboration
- Works well for REST APIs, microservices, and internal data contracts
- Helps you document expected request and response structures
- Easy to integrate into CI/CD, tests, and backend validation flows

## Features

- Validate JSON objects against reusable schemas
- Validate local schema and data files from the command line
- Supports Node.js projects with minimal setup
- Clean API for app and service integration
- Simple to extend for more advanced API validation workflows

## Installation

```bash
npm install api-schema-validation-kit
```

## Quick start

```js
const { validateData, loadSchema } = require("api-schema-validation-kit");

const schema = loadSchema("./schemas/user.schema.json");
const payload = {
  id: 1,
  name: "Ahmed",
  email: "ahmed@example.com",
  age: 28
};

const result = validateData(schema, payload);

if (!result.valid) {
  console.error(result.errors);
} else {
  console.log("Payload is valid.");
}
```

## CLI usage

```bash
node src/cli.js schemas/user.schema.json examples/valid-user.json
```

You can also run the built-in validator directly:

```bash
npm run validate -- schemas/user.schema.json examples/valid-user.json
```

## Project structure

- src/ — validation library and CLI entry point
- schemas/ — reusable JSON Schema files
- examples/ — sample valid and invalid payloads
- tests/ — validation test coverage
- docs/ — landing page for GitHub Pages

## Business value

This project is useful for:

- API product teams
- SaaS startups
- Backend and integration engineers
- Teams needing contract-first validation
- Freelance work and consulting packages around schema design

## Services for clients

- JSON Schema review and improvement
- API contract design and validation setup
- Node.js integration for services and backend apps
- CI/CD validation automation
- API quality and data governance consulting

## Founder

Sami Hassan Baismail

- GitHub: https://github.com/shbaismail-droid
- Email: shbaismail@gmail.com

## License

MIT License
