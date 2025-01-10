module.exports = (Schema, mongoose) => {
    const cryptoPrice = new Schema({
        coinId: {
            type: String,
            required: true,
            enum: ['bitcoin', 'matic-network', 'ethereum']
        },
        priceUSD: {
            type: Number,
            required: true
        },
        marketCapUSD: {
            type: Number,
            required: true
        },
        priceChange24h: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('cryptoPrice', cryptoPrice);
};