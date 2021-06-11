//TO CHECK WHETHER USER IS AN ADMIN OR NOT FOR CREATAIN APIS
module.exports = async function (request, response, next) {
  //take token
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

  //userid from there and then search for user through that id
  const userId = token.userId;
  const user = await User.findOne({ _id: userId });
  //check role of a user
  if (user.role != "Admin") {
    //if not admin throw error
    return response.status(401).json({
      status: false,
      message: "Youre not an authorize user to access this route",
    });
  }
  //if admin, he can access his routes
  next();
};
