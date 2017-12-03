import * as restify from 'restify';
import Cigarette from '../entity/Cigarette';
import User from '../entity/User';

export default class CigaretteMapper {

  public static mapMany(request:restify.Request):Cigarette[] {
    // if (request.body) {
    //   const cigarettes = request.body.cigarettes;
    //
    //   if (cigarettes && cigarettes.length > 0) {
    //     const results:Cigarette[] = [];
    //     cigarettes.forEach(c => {
    //       results.push(CigaretteMapper.mapOne(c));
    //     })
    //
    //   }
    //
    // }
    // return null;
    return [];
  }

  public static mapOne(input:any):Cigarette {
    // const cigarette:Cigarette = null;
    // if (input.creationDate) {
    //   cigarette.creationDate = input.creationDate;
    // }
    // if (input.userFbId) {
    //   cigarete.
    // }
    return null;
  }

}
