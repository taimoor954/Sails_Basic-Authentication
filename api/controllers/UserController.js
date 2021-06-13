/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const crypto = require("crypto");

const {
  sendSuccessResponse,
  sendErrorResponse,
  sendInvalidAuthResponse,
  sendNotFoundResponse,
} = require("../services/customResponse");
const { loginValidation } = require("../services/request-validation");

module.exports = {
  _config: { actions: false, rest: false, shortcuts: false },

  //CREATE NEW USER/ADMIN
  signup: async function (request, response) {
    var result = await User.createUser(request.body);

    if (!result.status) {
      sendInvalidAuthResponse(result, response);
    }

    sendSuccessResponse(result, response);
  },

  //LOGIN YOUR ACCOUNT
  login: async function (request, response) {
    var result = await User.loginUser(request.body);

    if (!result.status) {
      return sendInvalidAuthResponse(result, response);
    }

    sendSuccessResponse(result, response);
  },

  //LOGOUT YOUR ACCOUNT
  logout: function (request, response) {
    response.cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    }); //INVALID TOKEN WILL BE PROVIED AND THIS WILL BE EXPIRED WITHIN 10 SECONDS

    response.status(200).json({
      status: "succesfully loggedout",
    });
  
  },

  //CONFIRM USER THROUGH EMAIL
  confirmUser: async function (request, response) {
    const result = await User.verifyUser(request.params.token);

    if (!result.status) {
      return sendInvalidAuthResponse(result, response);
    }

    return sendSuccessResponse(result, response);
  },

  //FORGOT PASSWORD
  forgotPassword: async function (request, response) {
    const result = await User.passwordFogotten(request.body);
    if (result.status == false) {
      sendInvalidAuthResponse(result, response);
    }
    sendSuccessResponse(result, response);
  },

  //RESET PASSWORD
  resetPassword: async function (request, response) {
    const { token } = request.params;

    const { password, confirmPassword } = request.body;

    const result = await User.passwordReseting(
      token,
      password,
      confirmPassword
    );

    if (!result.status) {
      sendInvalidAuthResponse(result, response);
    }

    sendSuccessResponse(result, response);
  },

  //GET ONE USER ONLY ACCESSIBLE FOR ADMIN
  getUserById: async function (request, response) {
    const result = await User.getOneUser(request.params);
    if (!result.status) {
      return sendNotFoundResponse(result, response);
    }
    return sendSuccessResponse(result, response);
  },

  //GET All USER ONLY ACCESSIBLE FOR ADMIN
  getAll: async function (request, response) {
    const result = await User.getAllUser();
    return sendSuccessResponse(result, response);
  },
};
