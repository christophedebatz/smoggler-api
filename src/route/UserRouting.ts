import * as restify from 'restify';
import UserController from '../controller/UserController';
import CigaretteController from '../controller/CigaretteController';

function userRouting(api:restify.Server) {
  const userController:UserController = new UserController();
  const cigaretteController:CigaretteController = new CigaretteController();

  api.post('/api/users', userController.createUser);
  api.get('/api/users/:fbId/cigarettes', cigaretteController.getUserCigarettes);
  api.post('/api/users/:fbId/cigarettes', cigaretteController.addCigarettes);
}

module.exports.routes = userRouting;
