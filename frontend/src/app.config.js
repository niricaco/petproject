const _config = {
  dev: {
    todoapi: "http://localhost:8080/api",
    google_client_id:
      "248375511050-8tu71vfmt3ne71drsgfcm86ba7nea1ki.apps.googleusercontent.com",
    google_base_url: "https://accounts.google.com/o/oauth2/v2/auth",
  },
  prod: {
    todoapi: process.env.REACT_APP_TODOAPI || "https://app.niricaco.site/api",
    google_client_id:
      process.env.REACT_APP_CLIENT_ID ||
      "248375511050-8tu71vfmt3ne71drsgfcm86ba7nea1ki.apps.googleusercontent.com",
    google_base_url: "https://accounts.google.com/o/oauth2/v2/auth",
  },
};

const config =
  process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config;
