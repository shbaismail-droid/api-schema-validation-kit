const { validateSchema } = require("../src/validator");

validateSchema("./schemas/user.schema.json", "./examples/valid-user.json");
