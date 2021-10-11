const jwt = require('jsonwebtoken');
const { jwt: { JWT_AUDIENCE, JWT_ISSUER, JWT_ALGORITHM, JWT_EXPIRATION_TIME } } = require('../config/config');
const fs = require('fs');

exports.getJwtToken = async (userId, email, subject, salt) => {
    try {
        let privateKey = fs.readFileSync('../private.Key', 'utf8');

        let signOptions = {
            subject: subject,
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
            expiresIn: JWT_EXPIRATION_TIME,
            algorithm: JWT_ALGORITHM
        };

        return await jwt.sign({ userId, salt }, privateKey, signOptions);
    } catch (error) {
        throw error;
    }
}