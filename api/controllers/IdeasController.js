/**
 * IdeasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Ideas = require("../models/Ideas");
const {
  sendSuccessResponse,
  sendNotFoundResponse,
} = require("../services/customResponse");

module.exports = {
  createIdeas: async function (request, response) {
    const result = await Ideas.createIdeas(request);
    sendSuccessResponse(result, response);
  },

  getOne: async function (request, response) {
    console.log(request.params);
    const result = await Ideas.getOneIdea(request);
    if (!result.status) return sendNotFoundResponse(result, response);
    sendSuccessResponse(result, response);
  },

  getYourIdeas: async function (request, response) {
    const result = await Ideas.getUserSpecificIdeas(request);
    if (!result.status) return sendSuccessResponse(result, response);
    sendSuccessResponse(result, response);
  },
};
