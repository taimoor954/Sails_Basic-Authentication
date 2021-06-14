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
    const { title, body } = inputs.body;
    const user = await getUserFromId(inputs.userId);

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
    const {Id} = inputs.params;
    const user = await getOneFactoryById(Ideas, Id);
    if (!user)
      return {
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

  getUserSpecificIdeas: async function (inputs) {
    const userIdeas = await Ideas.find({ "user.id": inputs.userId }).meta({
      enableExperimentalDeepTargets: true,
    });
    console.log(userIdeas);

    if (userIdeas.length < 1) {
      return {
        status: false,
        message: "Failed",
        data: "You have not created any idea yet",
      };
    }

    return {
      status: true,
      message: "Success",
      data: userIdeas,
    };
  },
};
