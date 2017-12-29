import * as restify from 'restify';
import { logger } from '../service/logger';
import { UserDao } from '../model/dao/UserDao';
import User from '../model/entity/User';
import ServiceException, { ServiceErrorCodes } from './exception/ServiceException';
import UserMapper from '../model/mapper/UserMapper';

export default class UserService {

  /*
   * Creates a new user with constistancy checks before.
   *
   * @param user the user to store.
   * @returns the created user.
   */
   public createUser(user:User):Promise<User> {
    if (user && user.email && user.fbId && user.fbAccessToken) {
      return UserDao.getByEmailAndFbId(user.email, user.fbId)
        .then(dbUser => {
          let promise:Promise<User>;
          if (dbUser) {
            if (dbUser.fbAccessToken !== user.fbAccessToken) {
              promise = UserDao.updateUserFbAccessToken(dbUser, user.fbAccessToken)
            } else {
              throw new ServiceException(ServiceErrorCodes.USER_CREATION_DUPLICATE);
            }
          } else {
            promise = UserDao.createUser(user);
          }
          return promise
            .catch(err => {
              console.log('Error while creating new user.', err);
              throw new ServiceException(ServiceErrorCodes.USER_CREATION_ERROR, err.message);
            });
        });
    }
    return Promise.reject(new ServiceException(ServiceErrorCodes.EMPTY_INPUT));
  }

  /*
   * Authenticate user.
   *
   * @param userFbId the user fb id.
   * @param userFbAccessToken the user fb access token.
   * @returns the user.
   */
  public authenticateUser(userFbId:string, userFbAccessToken:string):Promise<User> {
    // console.log('userFbId=', userFbId, ', userFbAccessToken=', userFbAccessToken);
    return UserDao.getByFbIdAndAccessToken(userFbId, userFbAccessToken)
      .then(user => {
        if (user) return user;
        throw new ServiceException(ServiceErrorCodes.UNAUTHORIZED);
      });
  }

  public getUserByFbId(userFbId:string):Promise<User> {
    if (userFbId) {
      return UserDao.getByFbId(userFbId)
        .catch(err => {
          console.log('Error while fetching user by fbId.', err);
          throw new ServiceException(ServiceErrorCodes.USER_NOT_FOUND, err.message);
        });
    }
    throw new ServiceException(ServiceErrorCodes.USER_NOT_FOUND)
  }

}
