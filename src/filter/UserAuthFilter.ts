import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import UserMapper from '../model/mapper/UserMapper';
import ApiException from '../controller/exception/ApiException';

export default class UserAuthFilter {

  private service:UserService = new UserService();

  constructor() {
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  /*
   * Authenticate the current user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the authenticated user.
   */
  public authenticateUser(req: Request, res: Response, next: Next):void {
    // only the subcribe route have to be public
    if (req.method.toLowerCase() === 'post' && req.path().includes('/users')) {
      return next();
    }
    logger.info('[UserController] Authenticating user.');

    let hasError = false;
    const authorization = req.header('Authorization');
    if (authorization) {
      let split = authorization.split('-');
      if (split.length === 2) {
        this.service.authenticateUser(split[0], split[1])
          .then(user => {
            res.set('userFbId', user.fbId);
            next();
          })
          .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
      } else {
        hasError = true;
      }
    } else {
      hasError = true;
    }

    if (hasError) {
      res.json(401, new ApiException('invalid.authorization', 'Inexistant or invalid authorization header token.'));
    }
  }

}
