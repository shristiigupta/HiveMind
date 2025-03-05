require("dotenv").config();


// util/SecretToken.js
const jwt = require('jsonwebtoken');

// Ensure that `createSecretToken` is correctly exported
const createSecretToken = (userId) => {
  // You can adjust the secret key and expiration as needed
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { createSecretToken };
