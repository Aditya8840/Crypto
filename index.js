const express = require('express');
const server = express();
const router = express.Router();

const Config = require('./src/config/config.js');
const CronJobManager = require('./src/jobs');
const db = require('./src/models');
const logger = require('./src/util/logger');
const Services = require('./src/services');



const PORT = Config.port || '3000';

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

require('./src/routes')(router);
server.use('/api', router);

server.use((err, req, res, next) => {
    logger.info(err);
    let status = err.status || 500;
    let message = err.message || 'Something failed!';
    if (err.name === 'MongoError' && err.code === 11000) {
      status = 400;
      message = 'Value already exist';
    }
    res.status(status).json({
      status,
      message,
      data: {}
    });
});

server.listen(PORT, async () => {
    await db.connect();
    logger.info(`Server running on port ${PORT}`);
    CronJobManager.initJobs();
    CronJobManager.startAllJobs();
});