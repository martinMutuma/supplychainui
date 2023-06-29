import axios from "axios";
import {
  ChainEventSaveType,
  ChainEventType,
  ChainItemType,
  LoginUserDataType,
} from "../apptypes";
import ApiEndPoints, { APIBASEURL } from "./apiRoutes";
import path from "path";

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
function putApiCall(endPoint: string, data: any) {
  endPoint = ApiEndPointUrl(endPoint);
  return axios
    .put(endPoint, data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      return response;
    });
}
function deleteApiCall(endPoint: string) {
  endPoint = ApiEndPointUrl(endPoint);
  return axios.delete(endPoint, { headers: authHeader() }).then((response) => {
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
  ListUsers: () => {
    return getApiCall(ApiEndPoints.USERlIST);
  },
};

const ChainItemsAPI = {
  ListChainItems: () => {
    return getApiCall(ApiEndPoints.LISTCHAINITEMS);
  },
  GetSChainItem: (Id: Number) => {
    return getApiCall(
      path.join(ApiEndPoints.LISTCHAINITEMS, Id.toString(), "/")
    );
  },
  SaveSChainItem: (supplyChainItem: ChainItemType) => {
    if (supplyChainItem && supplyChainItem.id) {
      const putUrl = path.join(
        ApiEndPoints.LISTCHAINITEMS,
        supplyChainItem.id.toString(),
        "/"
      );

      return putApiCall(putUrl, supplyChainItem);
    }
    return postApiCall(ApiEndPoints.LISTCHAINITEMS, supplyChainItem);
  },
  DeleteSChainItem: (Id: Number) => {
    return deleteApiCall(
      path.join(ApiEndPoints.LISTCHAINITEMS, Id.toString(), "/")
    );
  },
};
const ChainEventsAPI = {
  ListChainEvents: () => {
    return getApiCall(ApiEndPoints.LISTCHAINEVENTS);
  },
  ListChainItemEvents: (itemId: number) => {
    const cUrl = path.join(
      ApiEndPoints.LISTCHAINEITEMSVENTS,
      itemId.toString(),
      "/"
    );
    return getApiCall(cUrl);
  },
  GetSChainEvent: (Id: Number) => {
    return getApiCall(
      path.join(ApiEndPoints.LISTCHAINEVENTS, Id.toString(), "/")
    );
  },
  SaveSChainEvent: (supplyChainEvent: ChainEventType | ChainEventSaveType) => {
    if (supplyChainEvent && supplyChainEvent.id) {
      const putUrl = path.join(
        ApiEndPoints.LISTCHAINEVENTS,
        supplyChainEvent.id.toString(),
        "/"
      );

      return putApiCall(putUrl, supplyChainEvent);
    }
    return postApiCall(ApiEndPoints.LISTCHAINEVENTS, supplyChainEvent);
  },
  DeleteSChainEvent: (Id: Number) => {
    return deleteApiCall(
      path.join(ApiEndPoints.LISTCHAINEVENTS, Id.toString(), "/")
    );
  },

  ListChainEventTypes: () => {
    return getApiCall(ApiEndPoints.LISTCHAINEVENTTYPES);
  },
  ListChainEventStatuses: () => {
    return getApiCall(ApiEndPoints.LISTCHAINEVENTSTATUS);
  },
  GetChainItemLatestEvent: (itemId: number) => {
    const cUrl = path.join(
      ApiEndPoints.LISTCHAINEITEMSVENTS,
      itemId.toString(),
      "/latest/"
    );
    return getApiCall(cUrl);
  },
};

const SC_API = { Auth_API, ChainItemsAPI, ChainEventsAPI };
export default SC_API;
