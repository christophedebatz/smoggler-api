import { Database } from './Database';
import { SelectQueryBuilder } from 'typeorm';
import Cigarette from '../entity/Cigarette';
import User from '../entity/User';

export const CigaretteDao = {

  getUserCigarettes(userFbId:string, from:Date|undefined, to:Date|undefined):Promise<Cigarette[]> {
    return Database.getInstance()
      .then(async connection => {
        const qb = await connection.getRepository(Cigarette)
          .createQueryBuilder('c')
          .innerJoin('c.user', 'user')
          .where('user.fbId = :userFbId', { userFbId });

        if (from) {
          qb.andWhere('creationDate > :from', { from });
        }

        if (to) {
          qb.andWhere('creationDate < :to', { to });
        }

        return qb.getMany();
      }
    );
  },

  addCigarettes(cigarettes:Cigarette[]):Promise<Cigarette[]> {
    return Database.getInstance()
      .then(async connection => await connection.getRepository(Cigarette).save(cigarettes));
  }
}
