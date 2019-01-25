import $http from "@/api/user"

export default {
  'GET_USERS_LIST':(params:any) => {
    return $http.getUsersList(params);
  }
}