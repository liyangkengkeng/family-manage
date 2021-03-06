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
  },
  'GET_PUBLIC_KEY':({ commit, state }: ActionContext<any,any>, params:User) => {
    return $http.getPublicKey()
      .then(({data}) => {
        commit('SET_PUBLIC_KEY', data.publicKey || '');
        return data.publicKey || '';
      })
      .catch(e => {
        commit('SET_PUBLIC_KEY', '');
        return '';
      })
  },
  'CHECK_LOGIN':({ commit, state }: ActionContext<any,any>) => {
    return $http.checkLogin()
      .then(({data}) => {
        return data || {};
      })
      .catch(({data}) => {
        throw data || {};
      })
  },
}