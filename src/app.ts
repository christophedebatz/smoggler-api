import * as fs from 'fs';
import 'reflect-metadata';
import * as restify from 'restify';
import { settings } from './config/config';
import { logger } from './service/logger';
import ApiException from './controller/exception/ApiException';
import { Database } from './model/dao/Database';
import UserAuthFilter from './filter/UserAuthFilter'

export const api = restify.createServer({
  name: settings.name
});

let authFilter:UserAuthFilter = new UserAuthFilter();
Database.getInstance(); // initializz database instance

api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.fullResponse());
api.use(authFilter.authenticateUser);

fs.readdirSync(__dirname + '/route').forEach((routeConfig: string): void => {
  if (routeConfig.substr(-3) === '.js') {
    const route = require(__dirname + '/route/' + routeConfig);
    route.routes(api);
  }
});

api.on('uncaughtException', (req, res, route, err) => {
    console.log('error = ', err);
});

api.listen(settings.port, (): void => {
  logger.info(`INFO: ${settings.name} is running at ${api.url}`);
});
