import $http from "@/api/activity";
import { ActionContext } from 'vuex';
import { Activity } from 'activity';

export default {
  'ADD':({ commit, state }: ActionContext<any,any>, params:Activity) => {
    return $http.addActivity(params);
  },
  'GET_LIST':({ commit, state }: ActionContext<any,any>) => {
    return $http.getList();
  },
}