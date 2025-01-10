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
    getSDLast100Prices: async (coin) => {
        try {
            const result =  await db.cryptoPrice.aggregate([
                { $match: { coin } },
                { $sort: { timestamp: -1 } },
                { $limit: 100 },
                { 
                    $group: { 
                        _id: null,
                        deviation: { 
                            $stdDevSamp: "$price" 
                        }
                    }
                }
            ]);
    
            return result;
        } catch (error) {
            logger.info(error);
            throw error;
        }
    },
};