const checkStatusActive = require("../services/checkStatusActive");

module.exports = async function (request, response, next) {
  if (!request.headers.authorization) {
    return response.status(400).json({
      status: false,
      message: "Youre not logged is. Please login to access ",
    });
  }
  const tokenFromHeader = request.headers.authorization.split(" ")[1];

  const token = await Token.findOne({ accessToken: tokenFromHeader });

  if (!token) {
    return response.status(400).json({
      status: false,
      message: "Youre token is corrupted. Login again ",
    });
  }
  console.log(token.userId, "HSUHSUHSUS");
  await checkStatusActive(token.userId, response)

  if (!request.body) {
    next();
    return;
  }
  request.body.userId = token.userId;

  next();
};
