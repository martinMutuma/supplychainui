export const APIBASEURL: string = "http://127.0.0.1:8000/";

const ApiEndPoints: { [key: string]: string } = {
  LOGIN: "auth/login/",
  USERlIST: "api/users/list/",
  LISTCHAINITEMS: "api/supplychain/items/",
  LISTCHAINEVENTS: "api/supplychain/events/",
  LISTCHAINEITEMEVENTS: "api/supplychain/item/events/",
  LISTCHAINEITEMLATESTEVENT: "api/supplychain/item/events/latest/",
  LISTCHAINEVENTTYPES: "/api/supplychain/event/types/",
  LISTCHAINEVENTSTATUS: "/api/supplychain/event/status/",
};

export default ApiEndPoints;
