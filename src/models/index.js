const path = require('path');

const glob = require('glob');

const basename = path.basename(__filename);
const mongoose = require('mongoose');
const logger = require('../util/logger');

const { Schema } = mongoose;

const config = require('../config/config.js');

const db = {
  generateObjectId: () => new mongoose.Types.ObjectId()
};

const connect = () => {
  mongoose
    .connect(config.mongoDbUrl)
    .then(() => {
      logger.info('Mongo DB connected successfully!!!!');
    })
    .catch((err) => {
      logger.info('Error connecting mongo DB', err);
    });
};

glob
  .sync(`${__dirname}/**/*.js`)
  .filter((file) => {
    const fileName = file.split('/');
    return (
      fileName[fileName.length - 1].indexOf('.') !== 0 &&
      fileName[fileName.length - 1] !== basename &&
      fileName[fileName.length - 1].slice(-3) === '.js'
    );
  })
  .forEach(async (file) => {
    const fileName = file.split('/');
    db[fileName[fileName.length - 1].slice(0, -3)] = require(file)(Schema, mongoose);
  });

db.connect = connect;
db.schema = Schema;

module.exports = db;
