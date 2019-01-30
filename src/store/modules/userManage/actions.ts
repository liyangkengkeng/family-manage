import $http from "@/api/user";
import { ActionContext } from 'vuex';
import { User } from 'user';

export default {
  'GET_USERS_LIST':({ commit, state }: ActionContext<any,any>, params:User) => {
    return $http.getUsersList(params);
  },
  'LOGOUT_USER':({ commit, state }: ActionContext<any,any>, params:User) => {
    return $http.logout(params);
  },
  'REGISTER_USER':({ commit, state }: ActionContext<any,any>, params:User) => {
    return $http.register(params);
  }
}