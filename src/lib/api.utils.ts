import { CustomMethod, SecureRequestProps } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";
import { APP_KEYS } from "./constant";

//this should be worked on in the future
axios.interceptors.request.use(
  (config) => {
    // Try to get the token from cookies first
    let token = Cookies.get(APP_KEYS.ACCESS_TOKEN);

    // Check if window is defined to ensure it's running on the client side
    if (!token && typeof window !== "undefined") {
      // If the token is not in cookies, try to get it from localStorage
      token = window.localStorage.getItem(APP_KEYS.ACCESS_TOKEN) || "";
    }

    // Attach the token to the Authorization header if it exists
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const secureRequest = async ({
  url,
  method = "get",
  body = undefined,
  headers: requestHeader,
}: SecureRequestProps) => {
  const givenMethod = method.toLocaleLowerCase() as CustomMethod;
  const headers = { ...requestHeader };
  if (givenMethod === "get" || givenMethod === "delete") {
    //dont include body in GET request request will fail
    return axios[givenMethod](url, {
      params: {
        ...body,
      },
      headers,
    });
  }

  return axios[givenMethod](url, body, { headers });
};
