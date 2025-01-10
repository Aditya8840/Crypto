const db = require('../models');
const logger = require('../util/logger');

module.exports = {
    create: async (priceDataObj) => {
        try {
            const prices = [...priceDataObj]
            const price = await db.cryptoPrice.insertMany(prices);
            return price;
        } catch (error) {
            logger.info(error);
            throw error;
        }
    },
    getLatestPrice: async (coin) => {
        try {
            return await db.cryptoPrice.findOne({coin})
                .sort({timestamp: -1})
        } catch (error) {
            logger.info(error);
            throw error;
        }
    },
    getLast100Prices: async (coin) => {
        try {
            return await db.cryptoPrice.find({coin})
               .sort({timestamp: -1})
               .limit(100)
        } catch (error) {
            logger.info(error);
            throw error;
        }
    },
};