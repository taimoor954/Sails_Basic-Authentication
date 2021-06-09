/**
 * Ideas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const { getOneFactoryById } = require("../services/factoryHandler");
const { getUserFromId } = require("../services/getUserfromId");

module.exports = {
  attributes: {
    title: {
      type: "string",
      required: true,
    },
    body: {
      type: "string",
      required: true,
    },
    user: {
      type: "json",
    },
  },

  createIdeas: async function (inputs) {
    const { title, body, userId } = inputs;
    const user = await getUserFromId(userId);

    if (!title || !body || !user) {
      return {
        status: false,
        message: "False",
        data: "Please fill all the required fields",
      };
    }

    const idea = await Ideas.create({
      title: title,
      body: body,
      user: user,
    }).fetch();

    return {
      status: true,
      message: "success",
      data: idea,
    };
  },

  getOneIdea: async function (inputs) {
    const Id = inputs;
    const user = await getOneFactoryById(Ideas, Id);
    if (!user) return {
      status: false,
      message: "Failed",
      data: "No user found with this id",
    };

    return {
      status: true,
      message: "Success",
      data: user,
    };
  },

  
};
