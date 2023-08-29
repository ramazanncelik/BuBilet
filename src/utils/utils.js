import store from "../store";
import { logout, user } from "../store/auth";

export const setUserData = (infos) => {
  if (infos) {
    store.dispatch(user(infos));
  } else {
    store.dispatch(logout());
  }
}