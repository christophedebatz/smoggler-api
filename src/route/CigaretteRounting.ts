import * as restify from 'restify';
import UserController from '../controller/UserController';

function userRouting(api:restify.Server) {
  const userController = new UserController();
}

module.exports.routes = userRouting;
