import { apiCreator } from './index';
//过后继续研究

export default {
  addActivity(params:any){
    return apiCreator().post('/activity/add', params)
  },
  getList() {
    return apiCreator().get('/activity/getList')
  }
}