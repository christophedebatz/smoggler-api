import {Config} from '../types';

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'smoggler',
  version: '1.0.0',
  port: 3000,
  env: 'dev'
};

if (env === 'production') {
  settings.env = 'prod';
}

let databaseSettings = {
  dev: {
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '',
    database: 'smoggler'
  },
  'prod': {
    host: '172.18.0.2',
    port: 3306,
    username: 'root',
    password: '',
    database: 'smoggler'
  }
};

if (databaseSettings[settings.env]) {
  settings.database = databaseSettings[settings.env];
}
