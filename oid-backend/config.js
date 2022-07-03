const config = {
  port: process.env.PORT || 8000,

  mongo: {
    // mongo connection options
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/oid-backend",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    },
  },

  jwt: {
    // jwt config
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: "1d",
  },

  cors: {
    // cors config
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: "1d",
  },

  api: {
    // api config
    prefix: "/api",
  },

  logflare: {
    // logflare config
    apiKey: process.env.LOGFLARE_API_KEY || "A6roeaSZx94T",
    sourceToken:
      process.env.LOGFLARE_SOURCE_ID || "b79d5199-13c7-45ec-a9b2-0ddffd5df0df",
  },

  // admin secret
  adminSecret: process.env.ADMIN_SECRET || "admin",
};

module.exports = config;
