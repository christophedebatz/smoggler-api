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
   * Creates a new user with constistancy checks before.
   *
   * @param user the user to store.
   * @returns the created user.
   */
  public getUserCigarettes(userFbId:string, from:Date, to:Date):Promise<Cigarette[]> {
    const duration = moment.duration(moment(to).diff(moment(from))).asDays();

    if (duration > UserService.MAX_DAYS_QUERY) {
      throw new ServiceException(ServiceErrorCodes.INVALID_INPUT_RANGE);
    }

    return CigaretteDao.getUserCigarettes(userFbId, from, to);
  }

}
