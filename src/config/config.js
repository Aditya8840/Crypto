require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoDbUrl: process.env.MONGO_DB_URL,
}