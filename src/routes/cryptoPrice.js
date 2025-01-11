const Controllers = require('../controllers');

module.exports = (router) => {
  router.route('/stats').get(Controllers.cryptoPrice.getLatestPrice);
  router.route('/deviation').get(Controllers.cryptoPrice.getSDLast100Prices);
};
