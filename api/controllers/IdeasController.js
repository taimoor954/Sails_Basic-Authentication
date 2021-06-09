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
    const result = await Ideas.createIdeas(request.body);
    sendSuccessResponse(result, response);
  },
  getOne: async function (request, response) {
    const result = await Ideas.getOneIdea(request.params.Id);
    if (!result.status) return sendNotFoundResponse(result, response);
    sendSuccessResponse(result, response);
  },
};

//body
//email and pass
//emai
