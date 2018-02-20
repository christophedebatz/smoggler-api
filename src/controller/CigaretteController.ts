import { Request, Response, Next } from 'restify';
import * as moment from 'moment';
import { logger } from '../service/logger';
import CigaretteService from '../service/CigaretteService';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import Cigarette from '../model/entity/Cigarette';
import UserMapper from '../model/mapper/UserMapper';
import CigaretteMapper from '../model/mapper/CigaretteMapper';
import ApiException from './exception/ApiException';
import { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class CigaretteController {

  private cigaretteService:CigaretteService = new CigaretteService();
  private userService:UserService = new UserService();

  constructor() {
    this.getUserCigarettes = this.getUserCigarettes.bind(this);
    this.addCigarettes = this.addCigarettes.bind(this);
  }

  /*
   * Returns the user cigarettes for a period.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the suer cigarettes.
   */
  public getUserCigarettes(req: Request, res: Response, next: Next):void {
    logger.info(`[CigaretteController] Fetching user id = ${res.get('userFbId')} cigarettes.`);
    const userFbId:string = res.get('userFbId');

    if (!userFbId) {
      throw ApiException.fromServiceCode(ServiceErrorCodes.USER_NOT_FOUND);
    }

    const fromDate:Date = (req.query.from) ? moment(req.query.from).toDate() : undefined;
    const toDate:Date = (req.query.to) ? moment(req.query.to).toDate() : undefined;

    this.cigaretteService.getUserCigarettes(userFbId, fromDate, toDate)
      .then(cigarettes => res.json(200, cigarettes))
      .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
  }

  /*
   * Save a collection of new cigarettes.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the saved cigarettes.
   */
  public addCigarettes(req: Request, res: Response, next: Next):void {
    logger.info(`[CigaretteController] Smoking for user id = ${res.get('userFbId')}.`);
    const userFbId:string = res.get('userFbId');

    if (!userFbId) {
      throw ApiException.fromServiceCode(ServiceErrorCodes.USER_NOT_FOUND);
    }

    this.userService.getUserByFbId(userFbId)
      .then((user:User) => CigaretteMapper.mapMany(user, req))
      .then((cigarettes:Cigarette[]) => this.cigaretteService.addCigarettes(cigarettes))
      .then(() => res.send(204))
      .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
  }

}
