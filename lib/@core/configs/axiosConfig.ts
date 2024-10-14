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
            if (response.Success) {
              const { token, refreshToken } = response.Resource.resource;
              await updateUser(token, refreshToken);

              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
              originalRequest.headers["Authorization"] = `Bearer ${token}`;

              return axios(originalRequest);
            } else {
              await userLogout();
            }
          } catch (error) {
            await userLogout();
          }
        } else {
          await userLogout();
        }
      }
      return Promise.reject(error);
    }
  );
};
