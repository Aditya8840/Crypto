const winston = require('winston');

const { combine, printf } = winston.format;

const logFormat = printf(({ level, message }) => {
    return `${new Date().toString()} ${level}: ${JSON.stringify(message)}`;
});

const logger = winston.createLogger({
    format: combine(winston.format.json(), logFormat),
    transports: [new winston.transports.Console()]
});

module.exports = logger;