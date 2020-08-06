

var crypto = require('crypto');
const { CRYPTO_KEY } = require('../properties/setup');

module.exports = {
    CRYPO_ENCRYPT: (data) => {
        const hash = crypto.createHmac('sha256', 'CRYPTO_KEY')
                   .update(data)
                   .digest('hex');
        return hash;
    },
    CRYPO_DECRYPT: (data) => {
        const hash = crypto.createHmac('hex', 'CRYPTO_KEY')
                   .update(data)
                   .digest('sha256');
        return hash;
    }
};