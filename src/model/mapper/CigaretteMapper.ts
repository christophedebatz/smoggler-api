import * as restify from 'restify';
import Cigarette from '../entity/Cigarette';
import User from '../entity/User';

export default class CigaretteMapper {

  public static mapMany(user: User, request:restify.Request):Cigarette[] {
    if (request.body && user) {
      const cigarettes = request.body.cigarettes;

      if (cigarettes && cigarettes.length > 0) {
        const results:Cigarette[] = [];
        cigarettes.forEach((cigarette:any) => {
          results.push(CigaretteMapper.mapOne(user, cigarette));
        });
        return results;
      }

    }
    return [];
  }

  public static mapOne(user: User, input:any):Cigarette {
    const cigarette:Cigarette = new Cigarette();
    if (input.creationDate) {
      cigarette.creationDate = input.creationDate;
    }
    if (user) {
      cigarette.user = user;
    }
    if (input.sentiment) {
      cigarette.sentiment = input.sentiment;
    }
    cigarette.creationDate = new Date();
    return cigarette;
  }

}
