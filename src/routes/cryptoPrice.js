const Controllers = require('../controllers');

module.exports = (router) => {
  router.route('/stats').post(Controllers.cryptoPrice.getLatestPrice);
  router.route('/deviation').post(Controllers.cryptoPrice.getSDLast100Prices);
};
