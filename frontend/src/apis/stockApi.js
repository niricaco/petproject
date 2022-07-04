import http from "axios";
import config from "../app.config";

export const stockApi = () => {
  const instance = http.create({
    baseURL: config.stockApi,
    timeout: 3000,
  });

  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("sessionToken"),
        },
      });
      return response;
    } catch (err) {
      return err.response;
    }
  };

  const get = async (path, data) => {
    try {
      const response = await instance.get(path, data, {
        headers: {
          authorization: localStorage.getItem("sessionToken"),
        },
      });
      return response;
    } catch (error) {
      if (!error.response) return error;
      return error.response;
    }
  };
  return { post, get };
};
