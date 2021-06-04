const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Token generator",

  description: "To Generate token using JWT",

  inputs: {
    id: { type: "string" },
  },
  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: function (id) {
    // TODO
    return jwt.sign(
      id,

      sails.config.custom.JWT_STRING, //SECRET STRING
      {
        ///token will be expiredin 90 days for securitty reasons
        expiresIn: sails.config.custom.TOKEN_EXPIRY_IN,
      }
    );
  },
};
