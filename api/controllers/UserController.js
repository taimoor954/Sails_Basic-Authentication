/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const User = require("../models/User");
const crypto = require("crypto");

module.exports = {
  signup: async function (request, response) {
    var result = await User.createUser(request.body);
    response.status(201).send(result);
  },
  login: async function (request, response) {
    var result = await User.loginUser(request.body);
    console.log(result);
    if (result.message == "Failed") {
      return response.status(400).json(result);
    }
    const token = await sails.helpers.tokenGenerator(result.id);

    response.status(200).json({
      message: "success",
      data: result,
      token,
    });
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
    const user = await User.verifyUser(request.params.token);
    response.status(200).json(user);
  },

  forgotPassword: async function (request, response) {
    const { email } = request.body;
    if (!email) {
      let result = { message: "Failed", data: "Please insert your email" };
      response.status(200).send(result);
    }
    const result = await User.passwordFogotten(email);

    response.status(200).send(result);
  },

  resetPassword: async function (request, response) {
    const {token} = request.params
    const {password, confirmPassword} = request.body
   await User.passwordReseting(token, password, confirmPassword)
  },
};
