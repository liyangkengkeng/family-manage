import axios from "axios";

export const apiCreator = () => {
  return axios.create({
    baseURL: '/family-manage/api',
    timeout: 3000
  })
}