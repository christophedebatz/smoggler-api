import * as restify from 'restify';
import UserController from '../controller/UserController';

function userRouting(api:restify.Server) {
  const userController = new UserController();
  api.post('/api/users/:fbId/cigarettes', userController.createUser);
}

module.exports.routes = userRouting;
