exports.sendErrorResponse  = function(errMsg , response)
{
     response.status(400).json(errMsg);
}

/*
Function to create error msgs for client
*/
exports.sendInvalidAuthResponse  = function(errMsg , response)
{
     response.status(403).json(errMsg);
}

/*
Function to create success msgs for client
*/
exports.sendSuccessResponse = function(happyMsg , response)
{
     response.status(200).json(happyMsg);
}