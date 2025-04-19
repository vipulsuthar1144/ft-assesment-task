import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import toastUtils from "@utils/toast";
import axios from "axios";

export const getAccessToken = (): string => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  return accessToken ? JSON.parse(accessToken) : "";
};

const requestHandler = (request: any) => {
  const token = getAccessToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const requestErrorHandler = (err: any) => {
  // store.dispatch(setTopLoadingProgress(100));
  return Promise.reject(err);
};

const responseHandler = (response: any) => {
  // store.dispatch(setTopLoadingProgress(100));
  // store.dispatch(toggleDialogPremiumRequired(true));
  return Promise.resolve(response);
};

const responseErrorHandler = (error: any) => {
  if (axios.isCancel(error)) {
    console.error("responseErrorHandler error " + error);
    return Promise.reject(error);
  }

  if (error.code === "ECONNABORTED") {
    toastUtils.error(error.message);
  } else if (error.code === "ERR_NETWORK") {
    toastUtils.error(`Internet Connection Problem`);
  } else if (error?.response?.status >= 400 && error?.response?.status <= 499) {
    if (error.response.status === 401) {
      localStorage.clear();
      toastUtils.error("Session Expired");
      window.location.href = `/${NavigationRoutes.LOGIN}`;
      // window.location.href = `/auth?message=${encodeURIComponent("Session timeout")}&&path=${JSON.stringify(window.location)}`;
    } else if (error?.response?.status >= 500) {
      if (error.response?.data?.Message) {
        toastUtils.error(
          `${error.response?.data.Message ?? "Internal Server Error"}`
        );
      } else {
        toastUtils.error("Internal Server Error");
      }
    }
  }
  return Promise.reject(error);
};

export {
  requestErrorHandler,
  requestHandler,
  responseErrorHandler,
  responseHandler,
};
