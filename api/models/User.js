const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ModelError = require("../services/ModelError");
const {
  sendConfirmationEmail,
  passwordRecoveryEmail,
} = require("./../services/EmailService.js");

const { matchPassword } = require("./../services/passwordMatcher");
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  //DEFINING MONGO DB SCHEMA
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
      type: "string" || undefined,
    },
  },
  customToJSON: function () {
    return _.omit(this, ["password"]); //ignore password at time of response
    //this points at the document which is just created
  },

  //BEFORE CREATE SAILS LIFE CYCLE
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

  //FOR SIGNUP
  createUser: async function (inputs) {
    const { email, password } = inputs;

    const verificationToken = crypto.randomBytes(32).toString("hex"); //without enc

    if(!inputs.name || !inputs.email || !inputs.password)
    {
      return {
        status : false,
        message : "Failed",
        data : "Please fill the require fields"
      }
    }

    const data = await User.create({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      token: verificationToken,
    }).fetch();
    sendConfirmationEmail(data.name, data.email, verificationToken);

    return  {
      status : true,
      message : "Success",
      data : data
    };
  },


  //USE FOR LOGGING IN USER
  loginUser: async function (inputs) {
   
    const email = inputs.email;
  
    const password = inputs.password;
  
    if (!email || !password) {
      return {
        status: false,
        message: "Failed",
        data: "Please Enter your valid email and password",
      };
    } 
  
    const user = await User.findOne({
      email,
    });

    if (!user || !(await User.comparePassword(user.password, password))) {
      return {
        status: false,
        message: "Failed",
        data: "Invalid email or password",
      };
    }

    const token = await sails.helpers.tokenGenerator(user.id);
  
    return {
      status: true,
      message: "Success",
      data:user,
      token
    };


  },


  //VERIFY USER EMAIL IS VALID OR NOT BY SENDING EMAIL TO HIM
  verifyUser: async function (tokenFromURL) {

    const user = await User.findOne({ token: tokenFromURL });
 
    if (!user) {
      return {
        status : false,
        message: "User not found from token",
        data: {},
      };
    }

    const updatedUser = await User.updateOne({ email: user.email })
      .set({ token: " " })
      .fetch();
    
    const token = await sails.helpers.tokenGenerator(updatedUser.id);
    
    return {
      status : true,
      message: "success",
      data: updatedUser,
      token: token,
    };

  },


  //USE TO COMPARE PASSWORD FOR LOGGING IN
  comparePassword: async function (candidnatePassword, userPassword) {
    //candidatepass is coming from req.body.pass whereas userpassword is password that is hashed and stored in mongo
    return await bcrypt.compare(userPassword, candidnatePassword); //return bool
  },


  passwordFogotten: async function (body) {
    
    const { email } = body;

    if (!email) {
    
      let result = { message: "Failed", data: "Please insert your email" };
    
      sendErrorResponse(result, response)
        
    }

    const user = await User.findOne({ email });
 
    if (!user) {
      return { message: "Failed", data: "Sorry no user found with this email" };
    }
    const verificationToken = crypto.randomBytes(32).toString("hex"); //without enc
 
    const updatedUser = await User.updateOne({ email: user.email })
      .set({ token: verificationToken })
      .fetch();
    passwordRecoveryEmail(user.name, user.email, verificationToken);
 
    return {
      status : true,
      message: "success",
      data: updatedUser,
    }
  },


  passwordReseting: async function (tokenFromURL, password, confirmPassword) {
    const user = await User.findOne({ token: tokenFromURL });

    if (!user) {
      return { message: "Failed", data: "No user with this id found" };
    }

    if (!password || !confirmPassword) {
      return {
        message: "Failed",
        data: "password or confirm password missing",
      };
    }

    const checkPassword = matchPassword(password, confirmPassword);

    if (!checkPassword) {
      return {
        message: "Failed",
        data: "Something wrong with password",
      };
    }

    const updatedUser = await User.updateOne({ email: user.email }).set(
      { token: " " },
      { password: password }
    );

    return {
      message: "Success",
      data: updatedUser,
    };

  },
};
