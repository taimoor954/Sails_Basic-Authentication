const jwt = require("jsonwebtoken");

exports.generateUUID = function () {
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

exports.setExpiryTime = () => {
  let limit = sails.config.custom.token_expiry;
  return Date.now() + limit * 24 * 60 * 60 * 1000;
};

exports.generateJwtToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    sails.config.custom.JWT_STRING,
    {
      ///token will be expiredin 90 days for securitty reasons
      expiresIn: sails.config.custom.TOKEN_EXPIRY_IN_JWT,
    }
  );
};

exports.createSendToken = () => {};
