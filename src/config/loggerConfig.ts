import 'winston-mongodb';

import winston from 'winston';

import serverConfig from './serverConfig';

const allowedTransports: winston.transport[] = [];

allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((log) => `${log.timestamp} [${log.level}]: ${log.message}`)
    )
}));

allowedTransports.push(new winston.transports.MongoDB({
    level: 'info',
    db: serverConfig.LOG_DB_URL, // configure the mongodb data-base to push the log to the database.
    collection: 'logs',
}));



const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`)
    ),
    transports: allowedTransports
});

export default logger;
