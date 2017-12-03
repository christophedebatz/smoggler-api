import * as restify from 'restify';
import { logger } from '../service/logger';
import { CigaretteDao } from '../model/dao/CigaretteDao';
import Cigarette from '../model/entity/Cigarette';
import User from '../model/entity/User';
import ServiceException from './exception/ServiceException';
import UserMapper from '../model/mapper/UserMapper';
import * as moment from 'moment';

export default class UserService {

  /*
   * Creates a new user with constistancy checks before.
   *
   * @param user the user to store.
   * @returns the created user.
   */
  public getUserCigarettes(userFbId:string, from: Date, to:Date):Promise<Cigarette[]> {
    return CigaretteDao.getUserCigarettes(userFbId, from, to);
  }

}
