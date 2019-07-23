'use strict';
import { expressApp, backendOperation } from './app';
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(expressApp);
export const frontend = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
}
export const backend = backendOperation;