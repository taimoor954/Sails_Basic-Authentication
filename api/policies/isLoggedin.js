const checkStatusActive = require("../services/checkStatusActive");
const jwt = require("jsonwebtoken");
module.exports = async function (request, response, next) {
  if (!request.headers.authorization) {
    return response.status(400).json({
      status: false,
      message: "Youre not logged is. Please login to access ",
    });
  }
  const tokenFromHeader = request.headers.authorization.split(" ")[1];
  const decodedToken = await jwt.verify(
    tokenFromHeader,
    sails.config.custom.JWT_STRING
  ); // the above one ant this one both return promise
  const freshUser = await User.findOne({ id: decodedToken.id });
  if (!freshUser)
    return next(
      new AppError("The user belonging to this token is no longer exist", 401)
    );

  
  
    // console.log(freshUser, 'Fresh user from is logged in');
  // const token = await Token.findOne({ accessToken: tokenFromHeader });
  // if (!token) {
  //   return response.status(400).json({
  //     status: false,
  //     message: "Youre token is corrupted. Login again ",
  //   });
  // }



  await checkStatusActive(freshUser.id, response);

  request.userId = freshUser.id;
  next();
};
