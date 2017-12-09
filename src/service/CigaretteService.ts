import * as restify from 'restify';
import { logger } from '../service/logger';
import { CigaretteDao } from '../model/dao/CigaretteDao';
import Cigarette from '../model/entity/Cigarette';
import User from '../model/entity/User';
import ServiceException, { ServiceErrorCodes } from './exception/ServiceException';
import UserMapper from '../model/mapper/UserMapper';
import * as moment from 'moment';

export default class UserService {

  private static MAX_DAYS_QUERY = 10;

  /*
   * Returns the user cigarettes for a period.
   *
   * @param userFbId the user facebook id.
   * @returns the user cigarettes.
   */
  public getUserCigarettes(userFbId:string, from:Date, to:Date):Promise<Cigarette[]> {
    const duration:number = moment.duration(moment(to).diff(moment(from))).asDays();

    if (duration > UserService.MAX_DAYS_QUERY) {
      throw ServiceException.create(
        ServiceErrorCodes.INVALID_INPUT_RANGE,
        `You can fetch a maximum of ${UserService.MAX_DAYS_QUERY} day(s) of data.`
      );
    }

    return CigaretteDao.getUserCigarettes(userFbId, from, to);
  }

  /*
   * Save a collection of new cigarettes.
   *
   * @param cigarettes the cigarettes to save.
   * @returns the saved cigarettes.
   */
  public addCigarettes(cigarettes:Cigarette[]):Promise<Cigarette[]> {
    if (cigarettes.length > 500) {
      throw ServiceException.create(
        ServiceErrorCodes.TOO_MANY_ITEMS,
        'You can push maximum 500 items per request.'
      );
    }

    return CigaretteDao.addCigarettes(cigarettes);
  }

}
