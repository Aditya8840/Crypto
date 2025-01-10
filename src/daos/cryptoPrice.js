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
    getLatestPrice: async (coinId) => {
        try {
            return await db.cryptoPrice.findOne({coinId})
                .sort({timestamp: -1})
        } catch (error) {
            logger.info(error);
            throw error;
        }
    },
    getSDLast100Prices: async (coinId) => {
        try {
            const result =  await db.cryptoPrice.aggregate([
                { $match: { coinId } },
                { $sort: { timestamp: -1 } },
                { $limit: 100 },
                { 
                    $group: { 
                        _id: null,
                        deviation: { 
                            $stdDevSamp: "$priceUSD" 
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