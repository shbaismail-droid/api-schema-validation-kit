# API Schema Validation Kit

A beginner-friendly open-source toolkit for validating API payloads and data contracts with JSON Schema.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-F7DF1E)](https://nodejs.org/)

## Why this project matters

Most API failures happen before a request reaches the core business logic. A payload is missing a field, contains the wrong type, or violates a team agreement. This toolkit helps teams validate data early, enforce contracts clearly, and avoid broken integrations.

## What it does

- Validate JSON payloads using JSON Schema.
- Catch invalid API requests before they hit production logic.
- Make schema-driven validation easy for beginners and teams.
- Reduce integration errors between frontend and backend.
- Support clear and reusable contracts for APIs.

## Installation

```bash
git clone https://github.com/shbaismail-droid/api-schema-validation-kit.git
cd api-schema-validation-kit
npm install
```

## Quick usage

### Validate a payload from the command line

```bash
node src/validator.js schemas/user.schema.json examples/valid-user.json
```

### Use it in JavaScript

```javascript
const { validateSchema } = require("./src");

const result = validateSchema("schemas/user.schema.json", "examples/valid-user.json");

if (!result.valid) {
  console.error(result.errors);
  process.exit(1);
}

console.log("Payload is valid.");
```

## Tests

```bash
npm test
```

## Project structure

- `src/` — validation engine
- `schemas/` — reusable JSON Schema examples
- `examples/` — valid and invalid sample payloads
- `tests/` — validation tests
- `todo-app/` — demo frontend app
- `joke-generator/` — another demo UI

## Demo apps included

This repo includes two lightweight demos for showcasing frontend and interaction work:

- `todo-app/` — a task manager with local storage
- `joke-generator/` — random joke generator using an external API

## Pricing and commercial offers

This project is open source, but it can also be turned into a consulting and product opportunity.

### Community
- Free
- Open-source toolkit
- Documentation and examples
- Community support

### Pro
- $19/month
- Advanced validation templates
- Better schema reporting
- Priority support

### Team
- $79/month
- Shared schema library
- Team onboarding
- Better API contract management

### Enterprise
- From $499/month
- Custom schema design
- API review and integration support
- SLA and dedicated assistance

## Professional services

I provide custom services for teams and founders, including:

- JSON Schema review and design
- API payload validation setup
- Data contracts and API contract design
- Node.js integration and validation pipeline setup
- QA and test strategy for API input validation
- Ongoing support and maintenance

Contact:
- GitHub: https://github.com/shbaismail-droid
- Email: shbaismail@gmail.com

## Roadmap

- [ ] Improve CLI output and developer UX
- [ ] Add TypeScript support
- [ ] Add OpenAPI-inspired validation helpers
- [ ] Add CI-ready schema validation workflows
- [ ] Build more examples for REST API payloads
- [ ] Add a premium templates package

## License

MIT License

## Arabic summary

هذا المشروع يساعد المطورين على التحقق من بيانات الـ API قبل وصولها إلى منطق التطبيق، ويستخدم JSON Schema كقاعدة واضحة ومشتركة بين فرق الواجهة والخلفية.
