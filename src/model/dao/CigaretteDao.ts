import { Database } from './Database';
import { SelectQueryBuilder } from 'typeorm';
import Cigarette from '../entity/Cigarette';
import User from '../entity/User';

export const CigaretteDao = {

  getUserCigarettes(userFbId:string, from:Date|undefined, to:Date|undefined):Promise<Cigarette[]> {
    return Database.getInstance()
    .then(async connection => {
      const qb:SelectQueryBuilder<Cigarette> = await connection.getRepository(Cigarette)
        .createQueryBuilder('cigarette')
        .leftJoinAndSelect('cigarette.user', 'user')
        .where('user.fb_id = :userFbId', { userFbId });

      if (from) {
        qb.andWhere('creation_date > :from', { from });
      }
      if (to) {
        qb.andWhere('creation_date < :to', { to });
      }
      console.log('sql=', qb.getSql());
      return qb.getMany();
    });
  }
}
