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
                    logger.error('Error in crypto price update job:', error);
                }
            });

            this.jobs.push(cryptoPriceFetchJob);
        } catch (error) {
            logger.error('Error initializing cron jobs:', error);
            throw error;
        }
    }

    startAllJobs() {
        try {
            this.jobs.forEach(job => job.start());
        } catch (error) {
            logger.error('Error starting cron jobs:', error);
            throw error;
        }
    }
}

module.exports = new CronJobManager();