module.exports = {
    db: {
        URL: process.env.DB_URL_PROD,
        options: {
            useUnifiedTopology: true,
            auto_reconnect: true,
            /*reconnectTries: Number.MAX_SAFE_INTEGER,*/ poolSize: 200,
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            readPreference: "primaryPreferred",
        }
    },
    jwt: {
        JWT_ISSUER: process.env.JWT_ISSUER,
        JWT_AUDIENCE: process.env.JWT_AUDIENCE,
        JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
        JWT_ALGORITHM: process.env.JWT_ALGORITHM
    },
    httpStatusCodes: {
        OK: 200,
        CREATED: 201,
        CONTENT_NOT_FOUND: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        REQUEST_TIMED_OUT: 408,
        ALREADY_EXISTS: 409,
        INTERNAL_SERVER: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
    }
}