import * as restify from 'restify';
import UserController from '../controller/UserController';
import CigaretteController from '../controller/CigaretteController';

module.exports.routes = {

  initialize(api:restify.Server) {
    const userController:UserController = new UserController();
    const cigaretteController:CigaretteController = new CigaretteController();

    // public resources
    api.post('/api/users', userController.createUser);

    // protected resources
    api.get('/api/me', userController.getUser);
    api.get('/api/me/cigarettes', cigaretteController.getUserCigarettes);
    api.post('/api/me/cigarettes', cigaretteController.addCigarettes);
  }

};
