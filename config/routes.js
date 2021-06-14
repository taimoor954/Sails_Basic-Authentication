/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const userController = "UserController";
const ideasController = "IdeasController";
module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  //CRUD OPERATION ROUTES
  "post /api/v1/user/signup": userController + ".signup",
  "post /api/v1/user/login": userController + ".login",
  "get /api/v1/user/logout": userController + ".logout",
  "get /api/v1/user/confirm/:token": userController + ".confirmUser",
  "get /api/v1/user/get-all-users": userController + ".getAllUsers",
  "post /api/v1/user/forgot-password": userController + ".forgotPassword",
  "post /api/v1/user/reset-password/:token": userController + ".resetPassword",
  "get /api/v1/user/get-one-by-id/:Id": userController + ".getUserById",
  "get /api/v1/user/get-all-user": userController + ".getAll",
  
  "post /api/v1/ideas/create": ideasController + ".createIdeas",
  "get /api/v1/ideas/get-one-idea/:Id": ideasController + ".getOne",
  "get /api/v1/ideas/get-my-ideas": ideasController + ".getYourIdeas",
  /***************************************************************************
   *                                                                          *
  


  * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
