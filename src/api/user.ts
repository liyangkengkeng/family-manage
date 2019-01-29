import { apiCreator } from './index';

export default {
  getUsersList(params:any){
    return apiCreator().get('/users/find', {params: params})
  },

  saveUsers (params:any){
    return apiCreator().get('/users/save', {params: params})
  },

  logout (params:any){
    return apiCreator().get('/users/logout', {params: params})
  },
}