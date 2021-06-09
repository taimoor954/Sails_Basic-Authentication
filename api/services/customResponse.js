exports.sendErrorResponse = function (errMsg, response) {
  delete errMsg.status;

  response.status(400).json(errMsg);
};

/*
Function to create error msgs for client
*/
exports.sendInvalidAuthResponse = function (errMsg, response) {
  delete errMsg.status;

  response.status(403).json(errMsg);
};

/*
Function to create success msgs for client
*/
exports.sendSuccessResponse = function (happyMsg, response) {
  delete happyMsg.status;

  response.status(200).json(happyMsg);
};

exports.sendNotFoundResponse = function (notFound, response) {
  delete notFound.status;

  response.status(404).json(notFound);
};
