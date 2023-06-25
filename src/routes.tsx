import { ComponentType } from "react";
import Login from "./components/auth/Login";
import HomePage from "./components/Home";
import ListChainItems from "./components/chainitems/ListChainItems";

export type AppRouteType = {
  path: string;
  title: string;
  exact?: boolean;
  showInTopMenu: boolean;
  component?: ComponentType;
  childroutes?: AppRouteType[];
  publicRoute?: boolean;
};

const appRoutes: AppRouteType[] = [
  { path: "/home", title: "Home", component: HomePage, showInTopMenu: true },
  {
    path: "/items",
    title: "Chain Items",
    component: ListChainItems,
    showInTopMenu: true,
  },
  { path: "/event", title: "Chain Events", showInTopMenu: true },
  { path: "/about", title: "About", showInTopMenu: true },
  {
    path: "/login",
    title: "Login",
    showInTopMenu: true,
    component: Login,
    publicRoute: true,
  },
];

export default appRoutes;
