import axios from "axios";
import {
  getUser,
  updateUser,
  userLogout,
} from "../../../src/context/SecureStore/UserSecureStore";
import { jwtValid } from "../../../src/context/SecureStore";
import Api from "../data/Api";

const isString = (object: any) => typeof object === "string";

type axiosConfigType = {
  baseURL: string;
};

export const configureAxios = (
  { baseURL }: axiosConfigType,
  navigationRef?: any
) => {
  if (axios.defaults.headers.common.Authorization) {
    return;
  }
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common.Accept = "application/json, text/plain, */*";
  axios.defaults.baseURL = baseURL;
  //axios.defaults.headers.common.Authorization = `ApiKey ${apiKey}`;

  axios.interceptors.request.use(async (request) => {
    const user: IUser = await getUser();
    //request.headers.set('Accept-Language', i18n.language);
    //request.withCredentials = true;
    if (user.token && jwtValid(user.loginDate)) {
      request.headers.Authorization = `Bearer ${user?.token}`;
      //request.headers.set('Accept-Language', i18n.language);
      return request;
    }
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
    async (error: any) => {
      let msg = error.message;
      console.error(
        "axios interceptors ERROR*",
        error.message,
        "response:",
        error.response
      );
      const originalRequest = error.config;
      console.log("status", error.response.status);
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const user: IUser = await getUser();

        if (user.refreshToken) {
          try {
            const response = await Api.post(
              "api/auth/CreateTokenByRefreshToken",
              {
                refreshToken: `${user.refreshToken}`,
              }
            );
            console.log("axios response", response);
            if (response.Success) {
              const { token, refreshToken } = response.Resource.resource;
              await updateUser(token, refreshToken);

              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
              originalRequest.headers["Authorization"] = `Bearer ${token}`;

              return axios(originalRequest);
            } else {
              console.log("no");

              await userLogout();
              if (navigationRef?.current?.navigate) {
                navigationRef.current.navigate("Login");
              }
            }
          } catch (error) {
            await userLogout();
            if (navigationRef?.current?.navigate) {
              navigationRef.current.navigate("Login");
            }
          }
        } else {
          if (navigationRef?.current?.navigate) {
            navigationRef.current.navigate("Login");
          }
          await userLogout();
        }
      }
      return Promise.reject(error);
    }
  );
  // console.error('axios interceptors ERROR stack', err.stack);
  // return new Promise((resolve, reject) => {
  //   if (msg === "Network Error") {
  //     if (err.response) {
  //       msg = `${err.response?.status}.`;
  //     } else {
  //       msg = `Network Error. Base URL: ${err.config?.baseURL}${err.config?.url}`;
  //     }
  //     resolve({
  //       Success: false,
  //       Message: msg,
  //     });
  //   } else if (err.response?.data) {
  //     const { response } = err;
  //     // console.log('axios err.response?.data --------- 1', response.data);
  //     if (isString(response.data)) {
  //       if (response.data.indexOf("<!DOCTYPE") > -1) {
  //         resolve({
  //           Success: false,
  //           Message: `${msg}. ${err.config?.baseURL}${err.config?.url}`,
  //         });
  //       }
  //     } else if (Object.keys(response.data ?? "").indexOf("Success") > -1) {
  //       // console.log('axios err.response?.data Success --------- 2', response.data);
  //       resolve(response?.data);
  //     } else {
  //       // console.log('axios err.response?.data Success --------- 3', response.data);
  //       resolve({
  //         Success: response?.status === 200 || response?.status === 201,
  //         Message: `${msg} ${response?.status}`,
  //         Resource: response?.data,
  //       });
  //     }
  //   } else {
  //     console.error("axios.interceptors.err", msg, err.response);
  //     if (err.response?.status === 401) {
  //       resolve({
  //         Success: false,
  //         Message: `401 Unauthorized. ${msg}. ${err.config?.baseURL}${err.config?.url}`,
  //       });
  //     } else if (err.response?.status === 403) {
  //       resolve({
  //         Success: false,
  //         Message: `403 Forbidden. The server received the request but refused authorization. ${msg}. ${err.config?.baseURL}${err.config?.url}`,
  //       });
  //     } else {
  //       resolve({
  //         Success: false,
  //         Message: `The server is working properly but error occurred. ${msg}`,
  //       });
  //     }
  //   }
  // });
};

// console.blue('configureAxios', axios.defaults);
// axios
// 	.get('/api/auth/test')
// 	.then((result) => console.log('axios test result: ', JSON.stringify(result, null, 2)))
// 	.catch((err: Error) => console.log('axios test result: ', err.message));
