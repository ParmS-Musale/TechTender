const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    return { error: "First name and Last name are required" };
  }
};

module.exports = { validateSignUpData };
