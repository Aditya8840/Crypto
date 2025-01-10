const { CronJob } = require('cron');
const logger = require('../util/logger');
const Services = require('../services');

class CronJobManager {
    constructor() {
        this.jobs = [];
    }

    initJobs() {
        try {
            const cryptoPriceFetchJob = new CronJob('0 0 */2 * * *', async () => {
                try {
                    await Services.cryptoPrice.updatePrices();
                } catch (error) {
                    logger.info(error);
                }
            });

            this.jobs.push(cryptoPriceFetchJob);
        } catch (error) {
            logger.info(error);
            throw error;
        }
    }

    startAllJobs() {
        try {
            this.jobs.forEach(job => job.start());
        } catch (error) {
            logger.info(error);
            throw error;
        }
    }
}

module.exports = new CronJobManager();