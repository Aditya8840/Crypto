const Services = require('../services');
const logger = require('../util/logger');


module.exports = {
    getLatestPrice: async (req, res, next) => {
        try {
            const { coin } = req.query;
            const latestPrices = await Services.cryptoPrice.getLatestPrice(coin);
            
            return res.status(200).json({
                status: 200,
                message: 'Success',
                data: {
                    "price": latestPrices.priceUSD,
                    "marketCap": latestPrices.marketCapUSD,
                    "24hChange": latestPrices.priceChange24h
                }
            });
        } catch (error) {
            logger.info(error);
            next(error);
        }
    },
    getSDLast100Prices: async (req, res, next) => {
        try {
            const { coin } = req.query;
            const deviation = await Services.cryptoPrice.getSDLast100Prices(coin);
            return res.status(200).json({
                status: 200,
                message: 'Success',
                data: { deviation }
            });
        } catch (error) {
            logger.info(error);
            next(error);
        }
    }
};