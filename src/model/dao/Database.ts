import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

let instance:Promise<Connection> = null;

export const Database = {
  getInstance():Promise<Connection> {
    if (instance === null) {
      instance = createConnection({
        type: 'mariadb',
<<<<<<< HEAD
        host: '172.18.0.1',
=======
        host: '172.18.0.2',
>>>>>>> feat(route): change routes
        port: 3306,
        username: 'root',
        password: 'H4DdGD6dqb6BBDNSsvqsdjqd,m',
        database: 'smoggler',
        entities: [  __dirname + '/../entity/*.js' ],
        synchronize: true
      }).catch(err => {
        throw new Error('Database error:' + err);
      });
    }
    return instance;
  }
}
