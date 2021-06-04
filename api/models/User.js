const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ModelError = require("../services/ModelError");
const { sendConfirmationEmail } = require("./../services/EmailService.js");
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    token: {
      type: "string",
      required: true,
    },
  },
  customToJSON: function () {
    return _.omit(this, ["password"]); //ignore password at time of response
    //this points at the document which is just created
  },

  beforeCreate: async function (user, cb) {
    //CHECK IF USER EXIST WITH THIS EMAIL

    const data = await User.findOne({
      email: user.email,
    });
    if (data) {
      let err = new Error();
      err.name = "Validation";
      err.code = 400;
      err.message = "User Already exist!!";
      err = 400;
      //  err//Just Add Another Parameter for statusCode
      return cb(ModelError("message error!!!!!!!!", 400));
    }

    //HASING PASSWORD
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },
  createUser: async function (inputs) {
    const { email, password } = inputs;
    console.log(email);
    const verificationToken = crypto.randomBytes(32).toString("hex"); //without enc

    const data = await User.create({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      token: verificationToken,
    }).fetch();
    console.log(data.name, data.email, data.token);
    sendConfirmationEmail(data.name, data.email, verificationToken);

    return data;
  },

  loginUser: async function (inputs) {
    console.log(inputs);
    const email = inputs.email;
    const password = inputs.password;
    if (!email || !password) {
      return {
        message: "Failed",
        data: "Please Enter your valid email and password",
      };
    }
    const user = await User.findOne({
      email,
    });

    if (!user || !(await User.comparePassword(user.password, password))) {
      return {
        message: "Failed",
        data: "Invalid email or password",
      };
    }
    return user;
  },
  verifyUser: async function (tokenFromURL) {
    console.log(tokenFromURL);
    const user = await User.findOne({ token: tokenFromURL });
    if (!user) {
      return "Please signup again with a valid email";
    }
    delete user.token
    console.log(user);

    const updatedUser = await User.updateOne({ email: user.email }).set({
      email : user.email,
      name: user.name,
      password: user.password,
      createdAt : user.createdAt,
      updatedAt:user.updatedAt,
      token: undefined
    });
    // console.log(updatedUser);
    // return token;
  },

  comparePassword: async function (candidnatePassword, userPassword) {
    //candidatepass is coming from req.body.pass whereas userpassword is password that is hashed and stored in mongo
    return await bcrypt.compare(userPassword, candidnatePassword); //return bool
  },
};
