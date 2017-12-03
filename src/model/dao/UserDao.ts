import { Database } from './Database';
import User from '../entity/User';

export const UserDao = {

  /**
   * Returns a user by its id.
   */
  getById(id:number):Promise<User> {
    return Database.getInstance()
    .then(async connection => {
      const userRepository = connection.getRepository(User);
      return await userRepository.findOneById(id);
    });
  },

  getByEmailAndFbId(email:string, fbId:string):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        const userRepository = connection.getRepository(User);
        return await userRepository.findOne({ email, fbId });
      });
  },

  getByFbIdAndAccessToken(fbId:string, fbAccessToken:string):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        const userRepository = connection.getRepository(User);
        return await userRepository.findOne({ fbId, fbAccessToken });
      });
  },

  getByFbId(fbId:string):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        const userRepository = connection.getRepository(User);
        return await userRepository.findOne({ fbId });
      });
  },

  /**
   * Saves and returns a new user.
   */
  createUser(user:User):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        const userRepository = connection.getRepository(User);
        return await userRepository.save(user);
      });
  }

};
