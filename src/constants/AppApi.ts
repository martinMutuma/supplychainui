import axios from "axios";
import { LoggedUserType, LoginUserDataType } from "../apptypes";
import ApiEndPoints, { APIBASEURL } from "./apiRoutes";

export const userAccessTokenKey = "userAccessTokenKey";

const ApiEndPointUrl = (endPoint: string): string => {
  return new URL(endPoint, APIBASEURL).toString() || APIBASEURL;
};

function authHeader() {
  const userStr = localStorage.getItem(userAccessTokenKey);

  if (userStr) {
    return { Authorization: "Bearer " + userStr };
  } else {
    return { Authorization: "" };
  }
}

function postApiCall(endPoint: string, data: any) {
  endPoint = ApiEndPointUrl(endPoint);
  return axios
    .post(endPoint, data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      return response;
    });
}

function getApiCall(endPoint: string) {
  endPoint = ApiEndPointUrl(endPoint);
  return axios.get(endPoint, { headers: authHeader() }).then((response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  });
}

const Auth_API = {
  LoginUser: (userData: LoginUserDataType) => {
    return postApiCall(ApiEndPoints.LOGIN, userData);
  },
};

const ChainItemsAPI = {
  ListChainItems: () => {
    return getApiCall(ApiEndPoints.LISTCHAINITEMS);
  },
};

const SC_API = { Auth_API, ChainItemsAPI };
export default SC_API;
