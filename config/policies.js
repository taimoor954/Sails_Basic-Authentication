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
  "*": ["IsLoggedIn", "isAdmin"],
  // Allow anyone to access the signup and verify user action, even if they're not logged in.
  UserController: {
    signup: true,
    confirmUser:true,
    login:true,
    // getAllUsers : ["isAdmin", "IsLoggedIn"]
  },

  IdeasController : {
    createIdeas : "isLoggedIn",
    getYourIdeas : "isLoggedIn"
  }
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
};
