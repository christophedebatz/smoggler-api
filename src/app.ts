import * as fs from 'fs';
import 'reflect-metadata';
import * as restify from 'restify';
import config from './config/config';
import { logger } from './service/logger';
import ApiException from './controller/exception/ApiException';
import { Database } from './model/Database';
import UserAuthFilter from './filter/UserAuthFilter'

export const api = restify.createServer({ name: config.name});

let authFilter:UserAuthFilter = new UserAuthFilter();
Database.getInstance(); // initialize database instance

api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.fullResponse());
api.use(authFilter.authenticateUser);

fs.readdirSync(__dirname + '/route').forEach((routeFile: string): void => {
  if (routeFile.substr(-3) === '.js') {
    const routes = require(__dirname + '/route/' + routeFile).routes;
    routes.initialize(api);
  }
});

api.listen(config.port, (): void => {
  logger.info(`INFO: ${config.name} is running at ${api.url}`);
});

api.on('uncaughtException', (req, res, route, err) => {
  console.error('error = ', err);
});

api.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
});
