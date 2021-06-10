module.exports = async function (request, response, next) {
  const tokenFromHeader = request.headers.authorization.split(" ")[1];
  if (!request.header("authorization")) {
    console.log(request.header("authorization"));
    next();
    return;
  }
  const token = await Token.findOne({ accessToken: tokenFromHeader });

  if (!token) {
    return response
      .status(400)
      .json({ status: false, message: "Your token is invalid" });
  }
  next();
};
