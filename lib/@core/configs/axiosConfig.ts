import axios from "axios";
import { isString } from "../utils";

type axiosConfigType = {
  baseURL: string;
};

export const configureAxios = ({ baseURL }: axiosConfigType) => {
  if (axios.defaults.headers.common.Authorization) {
    return;
  }
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common.Accept = "application/json, text/plain, */*";
  axios.defaults.baseURL = baseURL;
  //axios.defaults.headers.common.Authorization = `ApiKey ${apiKey}`;

  axios.interceptors.request.use((request) => {
    //request.headers.set('Accept-Language', i18n.language);
    request.withCredentials = true;
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      if (Object.keys(response ?? "").indexOf("Success") > -1) {
        return response;
      }
      if (response?.data) {
        if (Object.keys(response.data ?? "").indexOf("Success") > -1) {
          return response.data;
        }
        return {
          Success: response?.status === 200 || response?.status === 201,
          Message: "The API is working but an error has occurred. ",
          Resource: response?.data,
        };
      }
      return {
        Success: false,
        Message: "The API is working but an error has occurred. ",
        Resource: response?.data,
      };
    },
    (err: any) => {
      console.log("err", err);
      let msg = err.message;
      console.error(
        "axios interceptors ERROR*",
        err.message,
        "response:",
        err.response
      );
      // console.error('axios interceptors ERROR stack', err.stack);
      return new Promise((resolve, reject) => {
        if (msg === "Network Error") {
          if (err.response) {
            msg = `${err.response?.status}.`;
          } else {
            msg = `Network Error. Base URL: ${err.config?.baseURL}${err.config?.url}`;
          }
          resolve({
            Success: false,
            Message: msg,
          });
        } else if (err.response?.data) {
          const { response } = err;
          // console.log('axios err.response?.data --------- 1', response.data);
          if (isString(response.data)) {
            if (response.data.indexOf("<!DOCTYPE") > -1) {
              resolve({
                Success: false,
                Message: `${msg}. ${err.config?.baseURL}${err.config?.url}`,
              });
            }
          } else if (Object.keys(response.data ?? "").indexOf("Success") > -1) {
            // console.log('axios err.response?.data Success --------- 2', response.data);
            resolve(response?.data);
          } else {
            // console.log('axios err.response?.data Success --------- 3', response.data);
            resolve({
              Success: response?.status === 200 || response?.status === 201,
              Message: `${msg} ${response?.status}`,
              Resource: response?.data,
            });
          }
        } else {
          console.error("axios.interceptors.err", msg, err.response);
          if (err.response?.status === 401) {
            resolve({
              Success: false,
              Message: `401 Unauthorized. ${msg}. ${err.config?.baseURL}${err.config?.url}`,
            });
          } else if (err.response?.status === 403) {
            resolve({
              Success: false,
              Message: `403 Forbidden. The server received the request but refused authorization. ${msg}. ${err.config?.baseURL}${err.config?.url}`,
            });
          } else {
            resolve({
              Success: false,
              Message: `The server is working properly but error occurred. ${msg}`,
            });
          }
        }
      });
    }
  );

  // console.blue('configureAxios', axios.defaults);
  // axios
  // 	.get('/api/auth/test')
  // 	.then((result) => console.log('axios test result: ', JSON.stringify(result, null, 2)))
  // 	.catch((err: Error) => console.log('axios test result: ', err.message));

  return true;
};
