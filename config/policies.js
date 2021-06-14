/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  "*": ["isLoggedin", "isAdmin"],
  // Allow anyone to access the signup and verify user action, even if they're not logged in.

  UserController: {
    signup: true,
    //DISABLING ALL BLUE PRINT
    "*": false,
    //BOTH CAN WORK WITHOUT LOGIN AND ISADMIN POLICY
    confirmUser: true,
    login: true,
    //BOTH WILL CHECK ISLOGGEDIN AND IS ADMIN BEFORE WORKING
    getUserById: ["isLoggedin", "isAdmin"],
    getAll: ["isLoggedin", "isAdmin"],
  },

  IdeasController: {
    //DISABLING ALL BLUE PRINT
    "*": false,
    createIdeas: "isLoggedin",
    getYourIdeas: "isLoggedin",
    getOne : ['isLoggedin', 'isAdmin'],

  },
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
};
