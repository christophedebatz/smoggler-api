import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import UserMapper from '../model/mapper/UserMapper';
import ApiException from './exception/ApiException';

export default class UserController {

  private service:UserService = new UserService();

  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  /*
   * Create a new user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the created user.
   */
  public createUser(req: Request, res: Response, next: Next):void {
    logger.info('[UserController] Creating new user.');
    const user:User = UserMapper.map(req);

    this.service.createUser(user)
      .then(user => next(user))
      .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
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
    if (req.method.toLowerCase() === 'post' && req.path().includes('/users')) {
      return next();
    }

    logger.info('[UserController] Authenticating user.');

    const authorization = req.header('Authorization');
    if (authorization) {
      let split = authorization.split('-');
      if (split.length === 2) {
        return next(this.service.authenticateUser(split[0], split[1]));
      }
    }
    throw new ApiException('invalid.authorization', 'Inexistant or invalid authorization header token.');
  }

}
