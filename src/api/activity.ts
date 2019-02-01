import { apiCreator } from './index';
//过后继续研究

export default {
  addActivity(params:any){
    return apiCreator().post('/activity/add', params)
  },
  getList(params:any) {
    return apiCreator().get('/activity/getList', {params: params})
  }
}