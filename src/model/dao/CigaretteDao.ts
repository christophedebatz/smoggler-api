import { Database } from './Database';
import { SelectQueryBuilder } from 'typeorm';
import Cigarette from '../entity/Cigarette';
import User from '../entity/User';

export const CigaretteDao = {

  getUserCigarettes(userFbId:string, from:Date|undefined, to:Date|undefined):Promise<Cigarette[]> {
    return Database.getInstance()
      .then(async connection => {
        const l = await connection.getRepository(Cigarette)
          .createQueryBuilder('c')
          .innerJoin('c.user', 'user')
          .where('user.fbId = :userFbId', { userFbId });

        return l.getMany();

        // if (from) {
        //   qb.andWhere('creation_date > :from', { from });
        // }
        // if (to) {
        //   qb.andWhere('creation_date < :to', { to });
        // }
        // console.log('sql=', qb.getSql());
        // const l = qb.getMany();
        // console.log('l=', l);
        // return l;
      });
  }
}
