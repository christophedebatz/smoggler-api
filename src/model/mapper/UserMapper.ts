import * as restify from 'restify';
import User, { UserRole } from '../entity/User';

export default class UserMapper {

  public static map(request:restify.Request):User {
    if (request.body) {
      const b = request.body;
      const user:User = new User();
      user.email = b.email;
      user.creationDate = new Date();
      user.updateDate = new Date();
      user.fbAccessToken = b.fbAccessToken;
      user.fbId = b.fbId;
      user.firstName = b.firstName;
      user.lastName = b.lastName;
      user.pictureUrl = b.pictureUrl;
      user.role = UserRole.USER;
      return user;
    }
    return null;
  }

}
