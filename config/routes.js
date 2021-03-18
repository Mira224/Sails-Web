/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': { view: 'pages/homepage' },
  'GET /qpon/create': 'QponController.create',
  'POST /qpon/create': 'QponController.create',


  'GET /': 'QponController.home',
  'GET /qpon': 'QponController.home',

  'GET /qpon/json': 'QponController.json',
  'GET /qpon/read/:id': 'QponController.read',

  'GET /qpon/home': 'QponController.home',
  'POST /qpon/home': 'QponController.home',

  'GET /qpon/update/:id': 'QponController.update',
  'POST /qpon/update/:id': 'QponController.update',
  'POST /qpon/delete/:id': 'QponController.delete',
  "GET /qpon/admin": 'QponController.admin',
  "POST /qpon/admin": 'QponController.admin',

  'GET /qpon/search': 'QponController.search',
  'POST /qpon/search': 'QponController.search',

  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',


  'GET /qpon/:id/owners': 'QponController.populate',
  'POST /qpon/:id/owners': 'QponController.populate',
  'GET /user/:id/possessions': 'UserController.populate',
  'POST /user/possessions/redeem/:fk': 'UserController.redeem',
  'POST /user/possessions/remove/:fk': 'UserController.remove',

  'GET /user/redeemed': 'UserController.populate',
  'POST /user/redeemed': 'UserController.populate',
  'GET /qpon/owners/:id': 'QponController.populate',
  'POST /qpon/owners/:id': 'QponController.populate',
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
