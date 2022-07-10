const _config = {
  dev: {
    stockApi: "http://localhost:8080/api",
    google: {
      client_id:
        "248375511050-8tu71vfmt3ne71drsgfcm86ba7nea1ki.apps.googleusercontent.com",
      base_url: "https://accounts.google.com/o/oauth2/v2/auth",
    },
    oid: {
      client_id: "mycid",
      base_url: "http://localhost:3000",
    },
  },
  prod: {
    stockApi:
      process.env.REACT_APP_STOCKAPI ||
      "https://lionfish-app-tph5g.ondigitalocean.app/api",
    google: {
      client_id:
        process.env.REACT_APP_CLIENT_ID ||
        "248375511050-8tu71vfmt3ne71drsgfcm86ba7nea1ki.apps.googleusercontent.com",
      base_url: "https://accounts.google.com/o/oauth2/v2/auth",
    },
    oid: {
      client_id: process.env.REACT_CLIENT_ID || "mycid",
      base_url:
        process.env.REACT_OID_BASE_URL ||
        "https://seahorse-app-kxu8g.ondigitalocean.app/",
    },
  },
};

const config =
  process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config;
