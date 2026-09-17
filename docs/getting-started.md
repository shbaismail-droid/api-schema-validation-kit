# Getting Started

This toolkit helps validate JSON payloads against a JSON Schema.

## Step 1: Create a schema

Add a file under `schemas/` such as `user.schema.json`.

## Step 2: Add an example payload

Store valid and invalid examples under `examples/`.

## Step 3: Run the validator

```bash
node src/validator.js schemas/user.schema.json examples/valid-user.json
```

## Step 4: Use it in CI

You can add the command to your CI pipeline to block bad payloads automatically.

## Step 5: Sell the service

Use the project as a base for:
- API validation setup
- data contract consulting
- support and maintenance
- custom integrations
