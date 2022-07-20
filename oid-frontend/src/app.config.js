const _config = {
  dev: {
    oidapi: "http://localhost:8000/api",
  },
  prod: {
    oidapi: process.env.REACT_APP_OIDAPI || "http://localhost:8000/api",
  },
};

const config =
  process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config;
