import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import config from '../config/config';

let instance:Promise<Connection> = null;

export const Database = {
  getInstance():Promise<Connection> {
    if (instance === null) {
      instance = createConnection({
        type: 'mariadb',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        entities: [  __dirname + '/../entity/*.js' ],
        synchronize: true
      }).catch(err => {
        throw new Error('Database error:' + err);
      });
    }
    return instance;
  }
}
