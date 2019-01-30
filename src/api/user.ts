import { apiCreator } from './index';
//过后继续研究

export default {
  getUsersList(params:any){
    return apiCreator().get('/users/find', {params: params})
  },

  register (params:any){
    return apiCreator().post('/users/register', params)
  },

  logout (params:any){
    return apiCreator().get('/users/logout', {params: params})
  },
}