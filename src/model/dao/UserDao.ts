import { Database } from '../Database';
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

  updateUser(newUser:User, userId:number) {
    if (newUser && userId && !isNaN(userId)) {
      return Database.getInstance()
        .then(async connection => {
          const userRepository = connection.getRepository(User);
          let user:User = await userRepository.findOneById(userId);
          user.updateDate = new Date();
          user.lastName = newUser.lastName;
          user.firstName = newUser.firstName;
          user.fbAccessToken = newUser.fbAccessToken;
          user.fbAccessTokenExpirationDate = newUser.fbAccessTokenExpirationDate;
          user.email = newUser.email;
          user.pictureUrl = newUser.pictureUrl;
          await userRepository.save(user);
          return user;
        });
      }
      return Promise.reject(new Error('null.access.token'));
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
