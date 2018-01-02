import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import UserMapper from '../model/mapper/UserMapper';
import ApiException from './exception/ApiException';
import ServiceException, { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class UserController {

  private service:UserService = new UserService();

  constructor() {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getUser = this.getUser.bind(this);
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
      .catch((err:ServiceException) => res.json(err.status, new ApiException(err.message, err.cause)));
  }

  /*
   * Update a user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the updated user.
   */
  public updateUser(req: Request, res: Response, next: Next):void {
    const userFbId:string = res.get('userFbId');
    logger.info(`[UserController] Updating current user (id = ${userFbId}).`);
    const user:User = UserMapper.map(req);

    this.service.updateUser(user, userFbId)
      .then(user => res.send(204))
      .catch((err:ServiceException) => res.json(err.status, new ApiException(err.message, err.cause)));
  }

  /*
   * Return the current user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the current user.
   */
  public getUser(req: Request, res: Response, next: Next):void {
    const userFbId:string = res.get('userFbId');
    logger.info(`[UserController] Fetching current user (id = ${userFbId}).`);

    if (!userFbId) {
      throw ApiException.fromServiceCode(ServiceErrorCodes.USER_NOT_FOUND);
    }

    this.service.getUserByFbId(userFbId)
      .then(user => res.json(200, user))
      .catch((err:ServiceException) => res.json(err.status, new ApiException(err.message, err.cause)));
  }
}
