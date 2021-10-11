module.exports={
    db:{
        URL:process.env.DB_URL_DEV,
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
    JWT_ISSUER:process.env.JWT_ISSUER,
    JWT_AUDIENCE:process.env.JWT_AUDIENCE
}