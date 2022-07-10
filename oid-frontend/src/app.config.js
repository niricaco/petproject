const _config = {
  dev: {
    oidapi: "http://localhost:8000/api",
  },
  prod: {
    oidapi:
      process.env.REACT_APP_OIDAPI ||
      "https://plankton-app-kbvg9.ondigitalocean.app/api",
  },
};

const config =
  process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config;
