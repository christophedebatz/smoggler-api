import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

let instance:Promise<Connection> = null;

export const Database = {
  getInstance():Promise<Connection> {
    if (instance === null) {
      instance = createConnection({
        type: 'mariadb',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '',
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
