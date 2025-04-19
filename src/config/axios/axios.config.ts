import axios from "axios";
import {
  requestErrorHandler,
  requestHandler,
  responseErrorHandler,
  responseHandler,
} from "@config/axios/axios.interceptors";
import { BASE_API_URL } from "@utils/api-constant";

const baseInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

baseInstance.interceptors.response.use(
  response => responseHandler(response),
  error => responseErrorHandler(error)
);

const apiInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiInstance.interceptors.request.use(
  request => requestHandler(request),
  error => requestErrorHandler(error)
);

apiInstance.interceptors.response.use(
  response => responseHandler(response),
  error => responseErrorHandler(error)
);

export { apiInstance, baseInstance };
