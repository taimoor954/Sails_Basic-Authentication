/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const User = require("../models/User");
const crypto = require("crypto");
var validate = require("sails-hook-validation-ev/lib/validate");

const {
  sendSuccessResponse,
  sendErrorResponse,
  sendInvalidAuthResponse,
} = require("../services/customResponse");
const { loginValidation } = require("../services/request-validation");

module.exports = {
  signup: async function (request, response) {
    var result = await User.createUser(request.body);

    if (!result.status) {
      sendInvalidAuthResponse(result, response);
    }

    sendSuccessResponse(result, response);
  },

  login: async function (request, response) {
    var result = await User.loginUser(request.body);

    if (!result.status) {
      return sendInvalidAuthResponse(result, response);
    }

    sendSuccessResponse(result, response);
  },

  logout: function (request, response) {
    response.cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    }); //INVALID TOKEN WILL BE PROVIED AND THIS WILL BE EXPIRED WITHIN 10 SECONDS

    response.status(200).json({
      status: "succesfully loggedout",
    });
  },

  confirmUser: async function (request, response) {
    const result = await User.verifyUser(request.params.token);

    if (!result.status) {
      return sendInvalidAuthResponse(result, response);
    }

    return sendSuccessResponse(result, response);
  },

  forgotPassword: async function (request, response) {
    const result = await User.passwordFogotten(request.body);
    if (result.status == false) {
      sendInvalidAuthResponse(result, response);
    }
    sendSuccessResponse(result, response);
  },

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

  getAllUsers: async function (request, response) {},
};
