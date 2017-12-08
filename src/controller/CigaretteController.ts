import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import CigaretteService from '../service/CigaretteService';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import Cigarette from '../model/entity/Cigarette';
import UserMapper from '../model/mapper/UserMapper';
import CigaretteMapper from '../model/mapper/CigaretteMapper';
import ApiException from './exception/ApiException';
import * as moment from 'moment';

export default class CigaretteController {

  private cigaretteService:CigaretteService = new CigaretteService();
  private userService:UserService = new UserService();

  constructor() {
    this.getUserCigarettes = this.getUserCigarettes.bind(this);
  }

  /*
   * Create a new user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the created user.
   */
  public getUserCigarettes(req: Request, res: Response, next: Next):void {
    logger.info(`[CigaretteController] Fetching user id = ${req.params.userFbId} cigarettes.`);
    const userFbId:string = req.params.userFbId;

    if (!userFbId) {
      throw new ApiException('invalid.user.id');
    }

    const fromDate:Date = (req.body.from) ? moment.parseZone(req.body.from).toDate() : undefined;
    const toDate:Date = (req.body.to) ? moment.parseZone(req.body.to).toDate() : undefined;

    this.cigaretteService.getUserCigarettes(userFbId, fromDate, toDate)
      .then(cigarettes => res.json(200, cigarettes))
      .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
  }

  /*
   * Create a new user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the created user.
   */
  public addCigarettes(req: Request, res: Response, next: Next):void {
    logger.info(`[CigaretteController] Smoking for user id = ${req.params.userFbId}.`);
    const userFbId:string = req.params.userFbId;

    if (!userFbId) {
      throw new ApiException('invalid.user.id');
    }

    this.userService.getUserByFbId(userFbId)
      .then((user:User) => CigaretteMapper.mapMany(user, req))
      .then((cigarettes:Cigarette[]) => this.cigaretteService.addCigarettes(cigarettes))
      .then(() => res.send(204));
  }

}
