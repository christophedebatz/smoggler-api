import * as fs from 'fs';
import 'reflect-metadata';
import * as restify from 'restify';
import ApiException from './controller/exception/ApiException';
import { Database } from './model/dao/Database';
import UserController from './controller/UserController';
import { settings } from './config/config';
import { logger } from './service/logger';

export const api = restify.createServer({
  name: settings.name
});

let userController:UserController = new UserController();
Database.getInstance();

api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.fullResponse());
api.use(userController.authenticateUser);

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
