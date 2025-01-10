const axios = require('axios');
const config = require('../config/config');
const Dao = require('../daos');
const logger = require('../util/logger');

var self = module.exports = {
    coinArray: ['bitcoin','matic-network','ethereum'],
    fetchPrices: async () => {
        const url = 'https://api.coingecko.com/api/v3/simple/price';
        const params = {
            ids: self.coinArray.join(','),
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true,
            precision: 'full',
        };

        try {
            const { data } = await axios.get(url, {
                params,
                headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': config.coinGeckoApiKey,
                }
            });

            return data;
        } catch (error) {
            logger.info(error);
            throw new Error(error);
        }
    },
    updatePrices: async () => {
        try {
            const priceData = await self.fetchPrices();
            const priceObj = Object.entries(priceData).map(([coinId, data]) => ({
                coinId: coinId,
                priceUSD: data.usd,
                marketCapUSD: data.usd_market_cap,
                priceChange24h: data.usd_24h_change,
                lastUpdatedAt: data.last_updated_at,
            }));
            const prices = Dao.cryptoPrice.create(priceObj);
            return prices;
        } catch (error) {
            logger.info(error);
            throw new Error(error);
        }
    },
    getLatestPrice: async (coin) => {
        try {
            const price = await Dao.cryptoPrice.getLatestPrice(coin);
            return price;
        } catch (error) {
            logger.info(error);
            throw new Error(error);
        }
    },
    getSDLast100Prices: async (coin) => {
        try {
            const deviationObj = await Dao.cryptoPrice.getSDLast100Prices(coin);
            if (deviationObj.length < 1 || deviationObj[0].deviation === undefined) {
                throw new Error('Not enough data points to calculate standard deviation');
            }
            return deviationObj[0].deviation;
        } catch (error) {
            logger.info(error);
            throw new Error(error);
        }
    },
};