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
      .then(user => res.json(201, user))
      .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
  }

}
