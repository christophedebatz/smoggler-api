import * as restify from 'restify';
import { logger } from '../service/logger';
import { UserDao } from '../model/dao/UserDao';
import User from '../model/entity/User';
import ServiceException, { ServiceErrorCodes } from './exception/ServiceException';
import UserMapper from '../model/mapper/UserMapper';

export default class UserService {

  /*
   * Create a new user with constistancy checks before.
   *
   * @param user the user to store.
   * @returns the created user.
   */
   public createUser(user:User):Promise<User> {
    if (user && user.email && user.fbId && user.fbAccessToken) {
      return UserDao.getByEmailAndFbId(user.email, user.fbId)
        .then(dbUser => {
          if (dbUser) {
            throw new ServiceException(ServiceErrorCodes.USER_CREATION_DUPLICATE);
          }
          return UserDao.createUser(user);
        });
    }
    return Promise.reject(
      new ServiceException(ServiceErrorCodes.EMPTY_INPUT)
    );
  }
  
  /*
   * Update given user-id with constistancy checks before.
   *
   * @param user the user update request dto.
   * @returns the updated user.
   */
  public updateUser(user:User, userFbId:string):Promise<User> {
    if (userFbId) {
      return UserDao.getByEmailAndFbId(user.email, userFbId)
        .then(dbUser => {
          if (!dbUser) {
            throw new ServiceException(ServiceErrorCodes.USER_NOT_FOUND);
          }
          let userToSave = UserService.getUpdatedUserToSave(dbUser, user);
          return UserDao.updateUser(userToSave, dbUser.id);
        });
      }
      return Promise.reject(
        new ServiceException(ServiceErrorCodes.EMPTY_INPUT)
      );
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
    return Promise.reject(
      new ServiceException(ServiceErrorCodes.USER_NOT_FOUND)
    );
  }


  private static getUpdatedUserToSave(dbUser:User, updatedUser:User):User {
    if (updatedUser.email !== dbUser.email) {
      dbUser.email = updatedUser.email;
    }
    if (updatedUser.fbAccessToken !== dbUser.fbAccessToken) {
      dbUser.fbAccessToken = updatedUser.fbAccessToken
    }
    if (updatedUser.fbAccessTokenExpirationDate !== dbUser.fbAccessTokenExpirationDate) {
      dbUser.fbAccessTokenExpirationDate = updatedUser.fbAccessTokenExpirationDate
    }
    if (updatedUser.firstName !== dbUser.firstName) {
      dbUser.firstName = updatedUser.firstName;
    }
    if (updatedUser.lastName !== dbUser.lastName) {
      dbUser.lastName = updatedUser.lastName;
    }
    if (updatedUser.pictureUrl !== dbUser.pictureUrl) {
      dbUser.pictureUrl = updatedUser.pictureUrl;
    }
    return dbUser;
  }

}
